import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private users$: UsersService) { }

  canActivate(): any {
    return this.authService.isLoggedIn()
      .pipe(map(user => {
        if (user) {
          this.users$.setCurrentUser(user);
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }


      }));
  }
}
