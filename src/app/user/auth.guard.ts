import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackService } from "../services/snack.service";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(
    public authService: AuthService,
    private readonly router: Router,
    private readonly snack: SnackService
  ) {}
  canActivate(): boolean {
    const value = this.authService.currentUser;
    if (value) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      this.snack.authError();
      return false;
    }
  }
}
