import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-board-dialog",
  styleUrls: ["./dialog.scss"],
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>What shall we call this board?</mat-label>
        <input placeholder="Title" matInput [(ngModel)]="data.title" />
      </mat-form-field>
    </div>

    <div mat-dialog-actions>
      <button
        mat-button
        color="accent"
        [mat-dialog-close]="data.title"
        cdkFocusInitial
      >
        Create
      </button>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </div>
  `,
})
export class BoardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
