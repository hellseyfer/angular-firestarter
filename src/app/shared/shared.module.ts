import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { ShellComponent } from "./shell/shell.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
const components = [ShellComponent];

const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
