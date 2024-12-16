import { Directive, HostListener } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: "[appGoogleSignin]",
})
export class GoogleSigninDirective {
  constructor(public authService: AuthService) {}

  @HostListener("click")
  async onclick() {
    try {
      debugger;
      await this.authService.googleSignIn();
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }
}
