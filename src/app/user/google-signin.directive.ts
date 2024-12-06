import { Directive, HostListener } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@angular/fire/auth";

@Directive({
  selector: "[appGoogleSignin]",
})
export class GoogleSigninDirective {
  constructor(private afAuth: AngularFireAuth) {}

  @HostListener("click")
  async onclick() {
    try {
      debugger;
      const provider = new GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }
}
