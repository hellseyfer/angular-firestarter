import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { SnackService } from "src/app/services/snack.service";

@Component({
  selector: "app-email-login",
  templateUrl: "./email-login.component.html",
  styleUrls: ["./email-login.component.scss"],
})
export class EmailLoginComponent implements OnInit {
  form: UntypedFormGroup;

  type: "login" | "signup" | "reset" = "signup";
  loading = false;

  serverMessage: string;

  constructor(
    private afAuth: AuthService,
    private fb: UntypedFormBuilder,
    private snack: SnackService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(6), Validators.required]],
      passwordConfirm: ["", []],
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === "login";
  }

  get isSignup() {
    return this.type === "signup";
  }

  get isPasswordReset() {
    return this.type === "reset";
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  get passwordConfirm() {
    return this.form.get("passwordConfirm");
  }

  get passwordDoesMatch() {
    if (this.type !== "signup") {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = "Check your email";
      }
    } catch (err) {
      this.serverMessage = err.message;
      this.snack.message("Error: " + err.message);
    }

    this.loading = false;
  }
}
