import { Directive, HostListener, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: "[appGoogleSignin]",
})
export class GoogleSigninDirective {
  constructor(public afAuth: AuthService) {}

  @HostListener("click")
  async onclick() {
    try {
      debugger;
      await this.afAuth.googleSignIn();
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }
}
