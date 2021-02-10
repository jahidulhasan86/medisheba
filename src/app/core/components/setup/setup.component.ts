import {ChangeDetectorRef, Component, OnInit, OnDestroy, HostListener, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import swal from "sweetalert2";
// import isElectron from 'is-electron';
import * as $ from 'jquery';
// import { MessagingService } from 'src/app/messaging.service';
// import { AccountService } from 'src/app/services/user_service/account.service';
// import { ChatService } from 'src/app/chat.service';
import { AccountService } from '../../services/account/account.service';
import { MessagingService } from '../../services/messaging/messaging.service';

// export const isElectronRunning = isElectron();

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  routerName;
  shouldRun = true;
  currentUser: any;
  mobileQuery: MediaQueryList;
  showProgress: false;
  
  private _mobileQueryListener: () => void;
  showView: any;
  showViewText: string;
  public examActivityDefaultIconUrl='';
  public examActivitySelectedIconUrl='';
  
  @Output() generalViewEEmitter = new EventEmitter<any>()

  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    public router: Router, private messagingService: MessagingService, private acServices: AccountService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  @HostListener("window:beforeunload")
  beforeunloadHandler() {
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.UiModification();
  }

  ngOnInit() {
    this.router.navigate(['/dashboard']);
    this.UiModification();

    if(this.acServices.currentUser.role.role_name == 'Admin'){
      this.showViewText = 'General'
    }else{
      this.showViewText = 'General'
    }

    // this.showView = JSON.parse(localStorage.getItem("showView")); 
    // if(this.showView == 'admin'){
    //   this.showViewText = 'Communications'
    // } else if(this.showView == 'communication'){
    //   this.showViewText = 'Admin'
    // }

    let sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
      this.currentUser = JSON.parse(sessionUser);
    }
  }

  ngAfterViewInit(){
    this.UiModification();
  }
  
  // goToView(){
  //   this.showView = JSON.parse(localStorage.getItem("showView"));  // admin / communication
  //   if(this.showView == 'admin'){
  //     localStorage.setItem('showView', JSON.stringify('communication'));
  //     window.location.reload();
  //   }

  //   if(this.showView == 'communication'){
  //     localStorage.setItem('showView', JSON.stringify('admin'));
  //     window.location.reload();
  //   }
  // }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // logOut(e) {
  //   var accessToken = JSON.parse(localStorage.getItem("token"));
  //   var currentUserId = this.acServices.currentUser.id;

  //   swal({
  //     title: "Do you want to logout?",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#F49D23",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //     cancelButtonText: "No, Thanks"
  //   }).then(result => {
  //     if (result.value) {
  //       this.messagingService.unregisteredDevice(currentUserId).subscribe(
  //         result => {
  //           console.log(result);
  //         },
  //         err => {
  //           console.log(err);
  //         }
  //       );
  //       this.chatService.latestMessage = [];
  //       this.chatService.recentChatHistoryListListner.next(
  //         this.chatService.latestMessage
  //       );

  //       var res = this.acServices.logOut();
  //       if (res) {
  //         this.router.navigate(["/Signin"]);
  //         this.chatService.disconnect();
  //       }
  //     }
  //   });
  // }

  UiModification(){
    let header_height = $("#admin-header").height();
    $("#admin-sidenav-full-page").css("height", (window.innerHeight -  ( header_height + 10 )));
  }

  goToGeneralView(){
    this.generalViewEEmitter.emit(false)
  }
}
