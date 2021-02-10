import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../core/services/account/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
    public isLoggedIn = false;
    constructor(private router: Router, public accountService : AccountService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let xc = localStorage.getItem('sessionUser');
        if (localStorage.getItem('sessionUser')) {
            // returned true if logged in
            this.isLoggedIn = true;
        } else {
            //else redirect to login page
            this.router.navigate(['/Signin'], { queryParams: { sessionExpired: "Signin" } });
            // window.location.reload();
            this.isLoggedIn = false;
        }
        return this.isLoggedIn;
    }
}