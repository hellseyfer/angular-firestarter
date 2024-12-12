import { Component, inject } from "@angular/core";
import { BoardComponent } from "../board/board.component";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { SharedModule } from "src/app/shared/shared.module";
import { Board } from "../board.model";
import { Subscription } from "rxjs";
import { BoardService } from "../board.service";
import { MatDialog } from "@angular/material/dialog";
import { BoardDialogComponent } from "../dialogs/board-dialog.component";
import { SnackService } from "src/app/services/snack.service";

@Component({
  selector: "app-board-list-v2",
  templateUrl: "./board-list-v2.component.html",
  styleUrls: ["./board-list-v2.component.scss"],
  standalone: true,
  imports: [SharedModule, BoardComponent, CdkDrag, CdkDragHandle, CdkDropList],
})
export class BoardListV2Component {
  boards: Board[];
  sub: Subscription;
  private boardService = inject(BoardService);
  private dialog = inject(MatDialog);
  private snackBarService = inject(SnackService);

  constructor() {}
  ngOnInit() {
    this.sub = this.boardService.boards$.subscribe({
      next: (boards) => {
        this.boards = boards;
        this.snackBarService.boardUpdated();
      },
      error: (err) => console.log(err),
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: "400px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length,
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
