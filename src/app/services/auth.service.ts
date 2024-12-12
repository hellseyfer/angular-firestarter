import { inject, Injectable, OnDestroy } from "@angular/core";
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  signOut as firebaseSignOut,
} from "@angular/fire/auth";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  constructor() {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        console.log("Auth state changed:", aUser);
        this.currentUser = aUser;
      }
    );
  }
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;
  currentUser: User | null = null;

  async googleSignIn(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      console.log("Signed in successfully:", result.user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }

  // Sign in with email and password
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(
        "Signed in successfully with email and password:",
        userCredential.user
      );
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
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log("User created successfully:", userCredential.user);
    } catch (error) {
      console.error("Error during user creation:", error);
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log("Password reset email sent successfully.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  }

  // Sign out the current user
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(this.auth);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }
}
