import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BoardListV2Component } from "./board-list-v2/board-list-v2.component";

const routes: Routes = [{ path: "", component: BoardListV2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KanbanRoutingModule {}
