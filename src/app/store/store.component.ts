import { Component, Input } from "@angular/core";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"],
})
export class StoreComponent {
  @Input() storeItems: [];
}
