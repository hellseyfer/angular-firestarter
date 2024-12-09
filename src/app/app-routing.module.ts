import { NgModule } from "@angular/core";
import { Routes, RouterModule, InitialNavigation } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { AuthGuard } from "./user/auth.guard";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {
    path: "login",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "kanban",
    loadChildren: () =>
      import("./kanban/kanban.module").then((m) => m.KanbanModule),
    canActivate: [AuthGuard],
  },
  {
    path: "customers",
    loadChildren: () =>
      import("./customers/customers.module").then((m) => m.CustomersModule),
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled" as InitialNavigation,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
