import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BoardService } from "../board.service";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DeleteButtonComponent } from "src/app/shared/delete-button/delete-button.component";
@Component({
  selector: "app-task-dialog",
  styleUrls: ["./dialog.scss"],
  standalone: true,
  imports: [SharedModule, MatButtonToggleModule, DeleteButtonComponent],
  template: `
    <h2 mat-dialog-title>Task</h2>
    <mat-dialog-content class="content">
      <p>tap shift + enter for a new line</p>
      <mat-form-field>
        <textarea
          cdkFocusInitial
          class="task-description"
          placeholder="Task description"
          matInput
          [(ngModel)]="data.task.description"
          (keydown.enter)="onCreate()"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group [(ngModel)]="data.task.label">
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === "gray" ? "check_circle" : "lens"
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button color="accent" mat-button [mat-dialog-close]="data">
        {{ data.isNew ? "Add Task" : "Update Task" }}
      </button>

      <button mat-button (click)="onNoClick()">Cancel</button>

      <app-delete-button
        color="warn"
        (delete)="handleTaskDelete()"
        *ngIf="!data.isNew"
      ></app-delete-button>
    </mat-dialog-actions>
  `,
})
export class TaskDialogComponent {
  labelOptions = ["purple", "blue", "green", "yellow", "red", "gray"];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private readonly boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCreate(): void {
    // Handle the create action, like closing the dialog or further processing
    this.dialogRef.close(this.data); // Or whatever you want to do on "Create"
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.boardService.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }
}
