import { inject, Injectable } from "@angular/core";
import { Board, Task } from "./board.model";
import {
  addDoc,
  arrayRemove,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../services/auth.service";
import { User } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  boardCollectionRef: CollectionReference;
  boards$ = new BehaviorSubject<Board[]>([]);
  currentUser: User | undefined;
  // user
  constructor() {
    this.boardCollectionRef = collection(this.firestore, "boards");
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
        // get documents (data) from the collection using collectionData
        const q = query(
          this.boardCollectionRef,
          where("uid", "==", user.uid),
          orderBy("priority")
        );
        collectionData(q, { idField: "id" }).subscribe((boards) => {
          this.boards$.next(boards); // Update the BehaviorSubject with the new boards data
        });
      } else {
        this.boards$.next([]); // Clear the boards if no user is authenticated
      }
    });
  }
  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    const dataToSave = {
      ...data,
      uid: this.currentUser.uid,
      tasks: [{ description: "Hello!", label: "yellow" }],
    };
    addDoc(this.boardCollectionRef, <Board>dataToSave).then(
      (documentReference: DocumentReference) => {
        // the documentReference provides access to the newly created document
      }
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  async sortBoards(boards: Board[]) {
    const batch = writeBatch(this.firestore); // Create a Firestore batch using the injected Firestore instance

    // Iterate over each board and directly get its document reference
    boards.forEach((board, idx) => {
      const boardRef = doc(this.firestore, "boards", board.id); // Get the document reference directly by board ID
      batch.update(boardRef, { priority: idx }); // Add the update to the batch
    });

    // Commit the batch
    await batch.commit(); // Commit the batch to Firestore
  }
  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    const boardRef = doc(this.firestore, "boards", boardId);
    return deleteDoc(boardRef);
  }

  /**
   * Updates the tasks on the board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    const boardRef = doc(this.firestore, "boards", boardId);
    return updateDoc(boardRef, { tasks });
  }

  /**
   * Remove a specific task from the board
   */
  removeTask(boardId: string, task: Task) {
    const boardRef = doc(this.firestore, "boards", boardId);
    return updateDoc(boardRef, {
      tasks: arrayRemove(task),
    });
  }
}
