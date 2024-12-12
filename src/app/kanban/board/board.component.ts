import { Component, Input } from "@angular/core";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { TaskDialogComponent } from "../dialogs/task-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { BoardService } from "../board.service";
import { Task } from "../board.model";
import { CommonModule, NgFor } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { DeleteButtonComponent } from "src/app/shared/delete-button/delete-button.component";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    CommonModule,
    SharedModule,
    DeleteButtonComponent,
  ],
})
export class BoardComponent {
  @Input() board;

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: "purple" };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "500px",
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            result.task,
          ]);
        } else {
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteBoard(this.board.id);
  }

  constructor(
    private readonly boardService: BoardService,
    private readonly dialog: MatDialog
  ) {}
}
