import { inject, Injectable } from "@angular/core";
import { Auth, authState, User } from "@angular/fire/auth";
import { catchError, map, switchMap } from "rxjs/operators";
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
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "@angular/fire/firestore";
import { from, Observable, of, Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  private afAuth = inject(Auth);
  boardCollectionRef: CollectionReference;
  boards$: Observable<Board[]>;
  // user
  constructor() {
    // get reference
    this.boardCollectionRef = collection(this.firestore, "boards");
    const uidUser = this.afAuth.currentUser.uid;
    // get documents (data) from the collection using collectionData
    const q = query(
      this.boardCollectionRef,
      where("uid", "==", uidUser),
      orderBy("priority")
    );
    this.boards$ = collectionData(q, { idField: "id" });
  }
  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    const dataToSave = {
      ...data,
      uid: user.uid,
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
