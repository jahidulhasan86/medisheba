import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { AccountService } from 'src/app/core/services/account/account.service';
// import { AccountService } from 'src/app/services/user_service/account.service';

// @Injectable()

@Injectable({
	providedIn: 'root'  // <- ADD THIS
})

export class DoctorGuard implements CanLoad {
	constructor(private router: Router, public accountService: AccountService) { }

	canLoad(route: Route): boolean {
		if (this.accountService.currentUser.role.role_name == 'Doctor') {
			return true
		} else {
			return false
		}
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.accountService.currentUser.role.role_name == 'Doctor') {
			return true
		} else {
			return false
		}
	}
}
