import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { AccountService } from 'src/app/core/services/account/account.service';
import { MessagingService } from 'src/app/core/services/messaging/messaging.service';
import { XmppChatService } from 'src/app/shared/services/xmpp-chat/xmpp-chat.service';

@Component({
  providers: [],
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit, OnDestroy {

  public recentShow = false;
  public doctorsShow = false;
  public appointmentsShow = true;
  public aService;

  alertImg = '../../../assets/images/BellInactive.png'
  groupsImg = '../../../assets/images/TeamActive.png'
  friendImg = '../../../assets/images/friends_icon.png'
  contactImg = '../../../assets/images/contact_icon.png'
  devicesImg = '../../../assets/images/devices_icon.png'
  conferenceImg = '../../../assets/images/group_icon.png'
  callImg = '../../../assets/images/RecentInactive.png'
  locationImg = '../../../assets/images/locations_icon.png'
  taskImg = '../../../assets/images/devices_icon.png'

  isCallView: boolean = false;
  @Output() setupViewEEmitter = new EventEmitter<any>()
  currentUser: any;

  constructor(
    private accountService: AccountService,
    private router: Router, private messagingService: MessagingService, private xmppChatService: XmppChatService) {
    this.aService = accountService
  }

  ngOnInit() {
    if (this.appointmentsShow && this.accountService.currentUser.role.role_name == 'Patient') this.router.navigate(['/patient-appointment/schedule/departments']);
    if (this.appointmentsShow && this.accountService.currentUser.role.role_name == 'Doctor') this.router.navigate(['/doctor-appointment/today']);

    this.messagingService.currentMessageCast.subscribe(result => {
      if (!result) {
        console.log("No push message from server");
      } else {
        console.log(result)
      }
    });

    this.messagingService.onTokenChange$.subscribe((token) => {
      if (token) {
        if (this.accountService.currentUser) {
          this.messagingService.updateToken(this.accountService.currentUser.id, token).subscribe((result) => {
            console.log(result);
          });
        }
      }
    });

    // if(this.accountService.currentUser)
    !!this.accountService.currentUser ? this.connectXampp() : ''
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  _clickToShowView(e, src, position) {
    var menuAll = document.getElementsByClassName('topMenuIcon')
    var menuName = document.getElementsByClassName('menuName')
    for (let i = 0; i < menuAll.length; i++) {
      menuAll[i].classList.remove('tab-active-top')
      menuAll[i].classList.remove('tab-active-down')
      menuAll[i].classList.add('menuBackgroundcolor')
    }
    if (position == 'top') {
      e.currentTarget.classList.add('tab-active-top')
    }
    else {
      e.currentTarget.classList.add('menuBackgroundcolor_none')
      e.currentTarget.classList.add('tab-active-down')
      e.currentTarget.classList.remove('menuBackgroundcolor')
    }
    for (let i = 0; i < menuName.length; i++) {
      menuName[i].classList.remove('whiteColor')
    }
    e.currentTarget.firstChild.children[2].classList.add('whiteColor')
    this.alertImg = '../../../assets/images/BellInactive.png'
    if (src == 'doctors') {

      this.recentShow = false;
      this.doctorsShow = true;
      this.appointmentsShow = false;

      this.taskImg = '../../../assets/images/devices_icon.png'
      this.groupsImg = '../../../assets/images/TeamInactive.png'
      this.friendImg = '../../../assets/images/friends_icon_selected.png'
      this.contactImg = '../../../assets/images/contact_icon.png'
      this.devicesImg = '../../../assets/images/devices_icon.png'
      this.conferenceImg = '../../../assets/images/group_icon.png'
      this.callImg = '../../../assets/images/RecentInactive.png'
      this.locationImg = '../../../assets/images/locations_icon.png'
      this.router.navigate(['/doctor'])
    }
    if (src == 'appointments') {

      this.recentShow = false;
      this.doctorsShow = false;
      this.appointmentsShow = true;

      this.taskImg = '../../../assets/images/devices_icon.png'
      this.groupsImg = '../../../assets/images/TeamActive.png'
      this.friendImg = '../../../assets/images/friends_icon.png'
      this.contactImg = '../../../assets/images/contact_icon.png'
      this.devicesImg = '../../../assets/images/devices_icon.png'
      this.callImg = '../../../assets/images/RecentInactive.png'
      this.locationImg = '../../../assets/images/locations_icon.png'
      if (this.accountService.currentUser.role.role_name == 'Patient')
        this.router.navigate(['/patient-appointment'])
      if (this.accountService.currentUser.role.role_name == 'Doctor')
        this.router.navigate(['/doctor-appointment'])
    }
    if (src == 'recent') {

      this.recentShow = true;
      this.doctorsShow = false;
      this.appointmentsShow = false;

      this.taskImg = '../../../assets/images/devices_icon.png'
      this.groupsImg = '../../../assets/images/TeamInactive.png'
      this.friendImg = '../../../assets/images/friends_icon.png'
      this.contactImg = '../../../assets/images/contact_icon.png'
      this.devicesImg = '../../../assets/images/devices_icon.png'
      this.conferenceImg = '../../../assets/images/group_icon.png'
      this.locationImg = '../../../assets/images/locations_icon.png'
      this.callImg = '../../../assets/images/RecentActive.png'
      this.router.navigate(['/recent'])
    }
  }

  onActivate(event) {
    console.log(event.constructor.name)
    if (event.constructor.name == 'VideoRoomComponent') {
      this.isCallView = true
    } else {
      this.isCallView = false
    }
  }

  signOut() {
    Swal({
      title: 'Do you want to logout?',
      // imageUrl: 'assets/images/logout.jpg',
      showCancelButton: true,
      confirmButtonColor: '#F4AD20',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Thanks'
    }).then((result) => {
      if (result.value) {
        this.accountService.signOut().subscribe((result) => {
          if (result) {
            this.router.navigate(["/Signin"]);
            // this.xmppChatService.disconnect();
          }
        });
      }
    });
  }

  goToSetupView() {
    this.setupViewEEmitter.emit(true)
  }

  connectXampp() {
    setTimeout(() => {
      var userStore = JSON.parse(localStorage.getItem("sessionUser"));
      var user = {
        username: userStore.user_name,
        password: userStore.password,
        user_id: userStore.id
      };
      console.log('onconnect');
      this.xmppChatService.checkConnection(user);
      var globalRetryValue = 0;
      this.xmppChatService.onConnect$.subscribe(onConnect => {
        console.log(onConnect);
        console.log("globalRetryValue: ", globalRetryValue);
        if (onConnect == false) {
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

















  // for call test start
  getById(id) {
    this.accountService._getConferenceByUserIdsAndType(id, '1').subscribe(conference => {
      if ((conference.resultset && conference.resultset.length == 0) || conference.code == 200) {
        this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
        let friendList = [];
        let friendObj = {
          "user_id": id,
          "user_name": 'psaima'
        };
        friendList.push(friendObj);
        this.accountService._addConference(this.currentUser.user_name + "_To_" + friendObj.user_name, 'one_to_one', friendList, null, 'asia', '1').subscribe(createConference => {
          if (createConference.status == 'ok') {
            console.log('Add conference', createConference)
            this.makeCall(createConference.result.id);
          }
        })
      } else {
        console.log(conference.resultset[0].id)
        this.makeCall(conference.resultset[0].id);
      }
    })
  }

  makeCall(id) {
    this.accountService.makeCall(id, 'call', 'member_join', "1").subscribe(result => {
      if (result.status == 'ok') {
        console.log(result)
      }
    }, err => {
      console.log("can't make call", err)
    })
  }
  // for call test end

}

// navigator.serviceWorker.getRegistrations().then(
//   function (registrations) {
//     for (let registration of registrations) {
//       registration.unregister();
//     }
//   });


