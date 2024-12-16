import { inject, Injectable } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  signInWithPopup,
} from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly auth: Auth = inject(Auth);
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  private readonly provider = new GoogleAuthProvider();

  constructor(private readonly router: Router) {
    //this.handleRedirectResult();
  }

  async handleRedirectResult() {
    // Not working on firebase 9
    /*     const userCred = await getRedirectResult(this.auth);
    console.log("user cred: ", userCred);
    if (!userCred) {
      this.userSubject.next(null);
      return;
    }
    this.userSubject.next(userCred.user); */
  }

  get currentUser(): User | null {
    return this.auth.currentUser; // Snapshot of the user state
  }
  get user$() {
    return this.userSubject.asObservable(); // Observable for real-time updates
  }
  async googleSignIn(): Promise<void> {
    //signInWithRedirect(this.auth, this.provider);
    const userCred = await signInWithPopup(this.auth, this.provider);
    if (!userCred) {
      this.userSubject.next(null);
      return;
    }
    this.userSubject.next(userCred.user);
    this.router.navigate(["/kanban"]);
  }

  // Sign in with email and password
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const userCred = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCred) {
        this.userSubject.next(null);
        return;
      }
      this.userSubject.next(userCred.user);
      this.router.navigate(["/kanban"]);
    } catch (error) {
      console.error("Error during email and password sign-in:", error);
    }
  }

  // Create user with email and password
  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const userCred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCred) {
        this.userSubject.next(null);
        return;
      }
      this.userSubject.next(userCred.user);
      this.router.navigate(["/kanban"]);
    } catch (error) {
      console.error("Error during user creation:", error);
      throw error;
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  }

  // Sign out the current user
  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.userSubject.next(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  }
}
