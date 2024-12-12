import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SnackService } from "../services/snack.service";
import { AuthService } from "../services/auth.service";
import { User } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  user: User;
  constructor(public afAuth: AuthService, private snack: SnackService) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.afAuth.authState$.subscribe(
      (user) => (this.user = user)
    );
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}
