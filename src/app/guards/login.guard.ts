import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth$: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth$.isLoggedIn()
      .pipe(map((logged: boolean) => {
        if(logged) {
          this.router.navigate(['/dashboard']);
        }
        return true;
      }));
  }
}
