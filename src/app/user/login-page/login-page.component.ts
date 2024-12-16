import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { isPWA } from "src/app/shared/lib/isPWA";
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  isPWA = isPWA();
  constructor(public authService: AuthService) {}
}
