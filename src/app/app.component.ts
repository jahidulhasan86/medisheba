import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AccountService } from './core/services/account/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
		public acServices;

	constructor(public acService: AccountService, private titleService: Title) {
		this.acServices = acService;

	}
	
	ngOnInit() {
	}

	title = 'MEnterprise';
}
