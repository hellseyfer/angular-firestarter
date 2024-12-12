import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { User } from "@angular/fire/auth";

@Component({
  selector: "app-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user: User | null = null;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AuthService
  ) {
    this.afAuth.authState$.subscribe({
      next: (user) => (this.user = user),
      error: (err) => console.log(err),
    });
  }
}
