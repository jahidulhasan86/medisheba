import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { UiConfig } from '../../../../assets/uiconfig';
import { GlobalValue } from '../../../global'
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/services/account/account.service';
import { XmppChatService } from 'src/app/shared/services/xmpp-chat/xmpp-chat.service';
import { MessagingService } from '../../services/messaging/messaging.service';

@Component({
  providers: [],
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: any = {};
  inProgress = false;
  public acServices;
  globalValue;
  branceId: any;

  constructor(public acService: AccountService,
    public router: Router,
    public route: ActivatedRoute,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private xmppChatService: XmppChatService,
    private messagingService: MessagingService
  ) {
    this.acServices = acService;
    this.globalValue = GlobalValue;
  }

  public isRememberChecked;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.signinUIModification();
  }

  ngOnInit() {
    this.signinUIModification();
    setTimeout(() => {
      this.signinUIModification();
    }, 500);
    UiConfig.prototype.responsive();
    this.globalValue = GlobalValue;
    this.rememberMe()
  }

  onChange(e) {
    this.isRememberChecked = e.checked
  }

  rememberMe() {
    if (this.cookieService.check('remember_me')) {
      const encrypted_pass: string = this.cookieService.get('remember_me');
      var bytes = CryptoJS.AES.decrypt(encrypted_pass.toString(), 'securityKey')
      var remember_me = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.model.user_name = remember_me.user_name
      this.model.password = remember_me.password
      this.isRememberChecked = true
    } else {
      this.isRememberChecked = false
    }
  }

  createCookies(user_name, password) {
    let remember_me = {
      user_name: user_name,
      password: password
    }
    var remember_me_encrypted = CryptoJS.AES.encrypt(JSON.stringify(remember_me), 'securityKey')
    this.cookieService.set('remember_me', remember_me_encrypted, 7)
  }

  deleteCookies() {
    if (this.cookieService.check('remember_me')) {
      this.cookieService.delete('remember_me')
    }
  }

  signinUIModification() {
    setTimeout(() => {
      $('.mainPart').css("height", window.innerHeight);
    }, 500);

  }

  enterkeyPress(event) {
    if (event && event.keyCode === 13) {
      this.signIn()
    }

  }

  signIn() {
    this.acService.signIn(this.model.user_name, this.model.password).subscribe(
      (result) => {
        if (result.status === 'ok') {
          console.log('sign in then get token', result);
          this.router.navigate(['/home']);
          if (this.isRememberChecked == true) {
            this.createCookies(this.model.user_name, this.model.password);
          } else {
            this.deleteCookies();
          }
          this.pubsubAndXamppRegistration();
        }
      },
      (err) => {
        console.log(err);
        // this.loginErrorHandler(err);
      }
    );
  }

  async pubsubAndXamppRegistration() {
		// Rules: 1st call chatRegistration, then call pubsubRegistration, dont change the flow.
		await this.chatRegistration(this.acServices.currentUser.user_name, this.acServices.currentUser.password);
		await this.pubsubRegistration(this.acServices.currentUser.id, this.acServices.currentUser.password);
	}

	async chatRegistration(user_name, password): Promise<any> {
		this.xmppChatService.chatRegistration(user_name, password).subscribe(
			(result) => {
				if (result.status === 'ok') {
					console.log('working chat registration', result);
				}
			},
			(err) => {
				console.log('error in working chat registration', err);
			}
		);
	}

	async pubsubRegistration(user_id, password): Promise<any> {
		this.xmppChatService.pubsubRegistration(user_id, password).subscribe(
			(result) => {
				if (result.status === 'ok') {
          console.log('pubsub registration', result);
          this.firebaseNotificationPermission();

					// setTimeout(() => {
					// 	this.connectXampp();
					// 	this.firebaseNotificationPermission();
          // }, 1000);
          
				}
			},
			(err) => {
				console.log(err);
			}
		);
  }

  async firebaseNotificationPermission() {
		await this.messagingService.requestPermission();
		this.messagingService.receiveMessage();
	}
  
  connectXampp() {
		setTimeout(() => {
			const userStore = JSON.parse(localStorage.getItem('sessionUser'));
			const user = { username: userStore.user_name, password: userStore.password, user_id: userStore.id };
			this.xmppChatService.checkConnection(user);
			let globalRetryValue = 0;
			this.xmppChatService.onConnect$.subscribe((onConnect) => {
				console.log('globalRetryValue: ', globalRetryValue);
				if (onConnect === false) {
					globalRetryValue++;
					if (globalRetryValue <= 5) {
						this.xmppChatService.checkConnection(user);
					}
				} else {
					globalRetryValue = 0;
				}
			});
		}, 3000);
	}

}
