import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private authService: AuthService) {
  }

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    if(this.authService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    this.toast.open("You are not authorized! Please log in!");
    return false;
  }

}
