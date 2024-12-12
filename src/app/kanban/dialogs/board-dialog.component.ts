import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-board-dialog",
  styleUrls: ["./dialog.scss"],
  standalone: true,
  imports: [SharedModule],
  template: `
    <h2 mat-dialog-title>Board</h2>
    <mat-dialog-content class="content">
      <mat-form-field>
        <mat-label>What shall we call this board?</mat-label>
        <input
          cdkFocusInitial
          placeholder="Title"
          matInput
          [(ngModel)]="data.title"
          (keydown.enter)="onCreate()"
        />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button color="accent" [mat-dialog-close]="data.title">
        Create
      </button>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </mat-dialog-actions>
  `,
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCreate(): void {
    // Handle the create action, like closing the dialog or further processing
    this.dialogRef.close(this.data.title); // Or whatever you want to do on "Create"
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
