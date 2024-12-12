import { Component, Output, EventEmitter } from "@angular/core";
import { SharedModule } from "../shared.module";

@Component({
  selector: "app-delete-button",
  templateUrl: "./delete-button.component.html",
  styleUrls: ["./delete-button.component.scss"],
  standalone: true,
  imports: [SharedModule],
})
export class DeleteButtonComponent {
  canDelete: boolean;

  @Output() delete = new EventEmitter<boolean>();

  cancel() {
    this.canDelete = false;
  }

  prepareForDelete() {
    this.canDelete = true;
  }

  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;
  }
}
