import {
  Component, OnInit, ElementRef, OnDestroy, Output, EventEmitter
} from "@angular/core";
// import { AccountService } from "../../services/user_service/account.service";
import Swal from "sweetalert2";
import { Router, ActivatedRoute, NavigationStart } from "@angular/router";
// import {
//   MatDialog,
//   MatDialogConfig,
//   MatDialogRef,
//   TOOLTIP_PANEL_CLASS,
//   MAT_DIALOG_DATA
// } from "@angular/material";
import { DatePipe } from "@angular/common";
import * as $ from "jquery";
import { Pipe } from "@angular/core";
import { DomSanitizer, Title } from "@angular/platform-browser";
import { GlobalValue } from "../../global";
// import { MessagingService } from "../../messaging.service";
// import {
//   MatSnackBar,
//   MatSnackBarVerticalPosition,
//   MatSnackBarHorizontalPosition
// } from "@angular/material";
import { from, Subject, interval } from "rxjs";
import { takeWhile, timestamp } from "rxjs/operators";
// import { GlobalServices } from "../../services/global_services";
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";
import { UiConfig } from "../../../assets/uiconfig";
// import { NetworkStatusAngularService } from "network-status-angular";
import { ViewEncapsulation } from "@angular/core";
// import { CommonValue } from "../../common";
import { MatMenu } from "@angular/material/menu";
import { Subscription } from "rxjs";
// import { ChatService } from "../../chat.service";
import { CookieService } from "ngx-cookie-service";
// import {
//   online_status_display,
//   online_status_xmpp,
//   group_type
// } from "../../common";
import swal from "sweetalert2";
import { async } from "q";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from "src/app/core/services/account/account.service";
import { MessagingService } from "src/app/core/services/messaging/messaging.service";
import { GlobalServices } from "src/app/core/services/global/global_services";
// import isElectron from 'is-electron';
// import { CallService } from "src/app/feature/call/services/call/call.service";
// import { IncomingComponent } from "src/app/feature/call/components/incoming/incoming.component";
// export const isElectronRunning = isElectron()

const constmajorAlertImage = '../../../assets/images/alert/Major-Alert.png'
const constminorAlertImage = '../../../assets/images/alert/Minor-Alert.png'
const constimergencyAlertImage = '../../../assets/images/alert/Emergency-Alert.png'
const constinformativeAertImage = '../../../assets/images/alert/Informative-alert.png'
const constic_launcherImage = '../../../assets/images/ic_launcher.png'
const constprotectogetherLogo = '../../../assets/images/logo/LearnTogetherLogo.png'
const constalertImage = '../../../assets/images/alert/alert.png'
const constincomingAck = '../../../assets/images/alert/Incoming_Ack.png'
const constincomingNotAck = '../../../assets/images/alert/incoming_notAck.png'
const constoutgoingAck = '../../../assets/images/alert/Outgoing_Ack.png'
const constoutgoingNotAck = '../../../assets/images/alert/outgoing_notAck.png'
const constbellIcon = '../../../assets/images/bell.png'
const constblankProfilePic = '../../../assets/images/lg/new_res/default_profile icon.png'
const constblankProfilePicForMale = '../../../assets/images/male.png'
const constblankProfilePicForFemale = '../../../assets/images/female.png'
const consttickImage = '../../../assets/images/tick.png'
const conststatusGreenImage = '../../../assets/images/status_green.png'
const constcircleYellowImage = '../../../assets/images/Circle_Yellow.png'
const constcircleRedImage = '../../../assets/images/Circle_Red.png'
const conststatus_ashImage = '../../../assets/images/status_ash.png'
const constprofileArrowIcon = '../../../assets/images/admin_dashboard/three_dots_icon.png'

const leaveClassbtn = '../../../assets/images/lg/new_res/leave_class.png'
const callBtn = '../../../assets/images/lg/Call-Class.png'
const alertBtn = '../../../assets/images/lg/new_res/notification_icon.png'
const pttHeaderBtn = '../../../assets/images/lg/Class_PTT.png'
const constL2TogetherLogo = '../../../assets/images/lg/Login/medi-sheba-logo.png'

declare var chrome: any;
declare var require: any;

let ipcRenderer
let lastConferenceId = null;
let runningConferenceId = null;
let localConfId = "";
let globGs = null;
var calDialogRef = null;
var serverStatusDialog = null;
var audio = null;
let currentTab = "";
let anotherCallExists = false;
let timeoutCount: any;
let isExtExists = false;
let isIncommingCall;
let isOutGoingCall = false;
let exeOnce = 0;
let allConferenceList = null;
let session: any;
let connectionStatus = null;
let regionData = null;
let userIds = [];


// @Pipe({ name: "safeHtml" })
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  // host: {
  //   "(window:resize)": "onResize($event)"
  // }
})
export class HeaderComponent implements OnInit, OnDestroy {
  private alreadyJoined = false
  private subscriptions: Array<Subscription> = [];
  public protectogetherLogoUrl = '';
  public alertImageUrl = '';
  public majorAlertImageUrl = '';
  public minorAlertImageUrl = '';
  public imergencyAlertImageUrl = '';
  public informativeAertImageUrl = '';
  public incomingAckUrl = '';
  public incomingNotAckUrl = '';
  public outgoingAckUrl = '';
  public outgoingNotAckUrl = '';
  public bellIconUrl = '';
  public blankProfilePicUrl = '';
  public blankProfilePicUrlForMale = '';
  public blankProfilePicUrlForFemale = '';
  public tickImageUrl = '';
  public statusGreenImageUrl = '';
  public circleYellowImageUrl = '';
  public circleRedImageUrl = '';
  public status_ashImageUrl = '';
  public profileArrowIconUrl = '';

  public callButtonImgUrl = '';
  public leaveClassButtonImgUrl = '';
  public alertButtonImgUrl = '';
  public pttBtnImgUrl = ''

  public L2TogetherLogoUrl = '';

  isCallInSession: any;
  isPttCallInSession: boolean;
  oneToOneCall_id: string;
  imgSrc: string;
  // onlineStatusXmpp = online_status_xmpp;
  // onlineStatusDisplay = online_status_display;
  // groupType = group_type;
  public acServices;
  public elementRef;
  public appName;
  public friendrequests;
  num: number = 10;
  public list: number = 3;
  public showfriendrequests = false;

  public notificationCount = 0;
  // public notif_menu = CommonValue.notif_item;
  public notif_visible = false;
  public notif_frnd_list = [];
  public notif_conf_list = [];
  public notif_compnay_invitation_list = [];
  public notifSeenIds = [];
  public notif_selected_item = null;
  public ismore = false;
  public errMsg;
  public FrndList;
  public UpdateFrndList;
  public ShowFrndList;
  profile_pic;
  globalValue;
  public alertMessage;
  public allConferenceList;
  public iConfReady = false;
  public currentTab = null;
  public isAdmin = false;
  private sendLiveStatusSubscriber;
  public pendingFriendRequest;
  public allContactWithStatusList;
  public sendFriendRequest;
  selectedGroup;
  selectedConference;
  public lastActiveConference;
  private browserRefresh = false;
  alertFilter: any = { message_title: "" };
  confData;
  subscription: Subscription;
  onPresenceSubscriber: Subscription;
  onAllConferenceListSub: Subscription;
  onStdCloseSessionAfterDismissSub: Subscription;
  onIsCallSessionRunningSub: Subscription;
  onCurrentSelectedTabSub: Subscription;
  onLastActiveConfIdSub: Subscription;
  onRunningConfIdObserverSub: Subscription;
  onSingleConferenceCastSub: Subscription;
  onLastActiveConferenceSub: Subscription;
  onConfDataFromHomeNavbarSub: Subscription;
  onOpenChattingWindowCastSub: Subscription;
  onIsBrowserRefreshedObserver: Subscription;
  onIsItIncommingCallSub: Subscription;
  onConnectionStatusShowHide: Subscription;
  ogCallState;
  serverStatus;
  serverStatusIcon = "";
  serverStatusIconTitle = "";
  isXmppStatus = "";
  isPubsubStatus = "";
  isNotiStatus = "";
  isVeStatus = "";
  isConnected = true;
  currentUser: any;
  currentStatusName: any;
  isConnectedOnXampp: any = false;
  allConference: any = [];
  statusImgSrc = "";
  networkStatusMessage: string;
  currentCompanyInfo: any;
  recentChatHistoryList: any = [];
  public BroadCastMsgList: any = [];
  public msgSelectedList = {
    ids: []
  };
  alertData: any;
  alertCounter: any = 0;
  labelPosition = "before";
  alert_markerList: any = [];
  vertoIncomingCallInfo: any;
  allContactWithStatusByUserIdCast: any;
  isShowChattingWindow: boolean;
  company_features: any;
  isIotDashBoardActive = false;
  isCallSession: any;
  dialogObj: any;
  audioFile: any;
  isIncomingCall: any;
  initiator_id: any;
  isOutgoingCall: any;
  private groupMemberList = null;
  public conferenceActive;
  currentConferenceName;
  conferenceInfo;
  conferenceUsers;
  public callRunning;
  private headerBackColor = "#F0F0F0";
  private headerForeColor = "#FFFFFF";
  onConnectXampp: boolean = false;
  isDoctorRole = false;
  showView: any;
  showViewText: string;


  @Output() setupViewEEmitter = new EventEmitter<any>()

  // @Output() callViewEEmitter = new EventEmitter<any>()

  constructor(
    public acService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    myElement: ElementRef,
    public domSantizer: DomSanitizer,
    public messagingService: MessagingService,
    public snackBar: MatSnackBar,
    public globalService: GlobalServices,
    // private networkStatusAngularService: NetworkStatusAngularService,
    private route: ActivatedRoute,
    private titleService: Title,
    public cookie: CookieService,
    // private callService: CallService
  ) {

    // if (isElectronRunning) {
    //   let electron = window['require']("electron");
    //   ipcRenderer = electron.ipcRenderer;
    // }

    this.acServices = acService;
    this.elementRef = myElement;
    this.selectedGroup = {
      iselected: false,
      isgroup: false,
      user_name: "",
      user_id: "",
      group_id: "",
      total_user: 0,
      user_list: [],
      is_init_map: true
    };

    this.isPttCallInSession = false;
    this.acServices.roleCheckerObserver.subscribe(x => {
      this.isDoctorRole = x;
    })

    this.subscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });

    this.protectogetherLogoUrl = constprotectogetherLogo;
    this.alertImageUrl = constalertImage;
    this.majorAlertImageUrl = constmajorAlertImage;
    this.minorAlertImageUrl = constminorAlertImage;
    this.imergencyAlertImageUrl = constimergencyAlertImage;
    this.informativeAertImageUrl = constinformativeAertImage;
    this.incomingAckUrl = constincomingAck;
    this.incomingNotAckUrl = constincomingNotAck;
    this.outgoingAckUrl = constoutgoingAck;
    this.outgoingNotAckUrl = constoutgoingNotAck;
    this.bellIconUrl = constbellIcon;
    this.blankProfilePicUrl = constblankProfilePic;
    this.blankProfilePicUrlForMale = constblankProfilePicForMale;
    this.blankProfilePicUrlForFemale = constblankProfilePicForFemale;
    this.tickImageUrl = consttickImage;
    this.statusGreenImageUrl = conststatusGreenImage;
    this.circleYellowImageUrl = constcircleYellowImage;
    this.circleRedImageUrl = constcircleRedImage;
    this.status_ashImageUrl = conststatus_ashImage;
    this.profileArrowIconUrl = constprofileArrowIcon;

    this.callButtonImgUrl = callBtn;
    this.leaveClassButtonImgUrl = leaveClassbtn;
    this.alertButtonImgUrl = alertBtn;
    this.pttBtnImgUrl = pttHeaderBtn;
    this.L2TogetherLogoUrl = constL2TogetherLogo;

  }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.acServices;
    this.titleService.setTitle(GlobalValue.title_name);
    this.router.navigate(['/home']);
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
    this.currentCompanyInfo = JSON.parse(localStorage.getItem("companyInfo"));
    let url = window.location.href.indexOf("?token=");
    if (url > 0) {
      this.acServices.logOut();
    }

    // this.onPresenceSubscriber = this.chatService.onPresence$.subscribe(() => {
    //   let obj = this.chatService.presenceList[this.currentUser.user_name];
    //   if (obj == online_status_xmpp.online) {
    //     this.currentUser.statusImgSrc =
    //       "../../../assets/images/status_green.png"
    //     this.currentUser.statusName = online_status_display.online;
    //   } else if (obj == online_status_xmpp.away) {
    //     this.currentUser.statusImgSrc =
    //       "../../../assets/images/Circle_Yellow.png"
    //     this.currentUser.statusName = online_status_display.away;
    //   } else if (obj == online_status_xmpp.busy) {
    //     this.currentUser.statusImgSrc = "../../../assets/images/Circle_Red.png"
    //     this.currentUser.statusName = online_status_display.busy;
    //   } else if (obj == online_status_xmpp.invisible) {
    //     this.currentUser.statusImgSrc = "../../../assets/images/status_ash.png"
    //     this.currentUser.statusName = online_status_display.invisible;
    //   }

    //   if (this.currentUser.statusImgSrc) {
    //     this.imgSrc = this.currentUser.statusImgSrc;
    //     this.currentStatusName = this.currentUser.statusName
    //   } else {
    //     this.imgSrc = "";
    //     this.currentStatusName = ''
    //   }
    // });

    this.messagingService.requestPermission(this.acServices.currentUser.id);

    this.messagingService.onTokenChange$.subscribe(token => {
      this.messagingService
        .updateToken(this.acService.currentUser.id, token)
        .subscribe(result => {
          console.log(result);
        });
    });

    // this.acService.appNameCast.subscribe(result => (this.appName = result));

    this.globalValue = GlobalValue;

    this.messagingService.currentMessageCast.subscribe(result => {
      if (!result) {
        console.log("No push message from server");
      } else {
        this.pushNotification(result);
      }
    });

    // this.chatService.onStatusChange$.subscribe(status => {
    //   connectionStatus = status;
    // });

    // this.chatService.onConnect$.subscribe(onConnect => {
    //   if (!this.isPttCallInSession) {
    //     this.onConnectXampp = onConnect;
    //   }
    //   if (onConnect) {
    //     var offlineMessageOnLocalStorage = [];
    //     offlineMessageOnLocalStorage = JSON.parse(
    //       localStorage.getItem("offline_message")
    //     );

    //     if (offlineMessageOnLocalStorage.length != 0) {
    //       for (let i = 0; i < offlineMessageOnLocalStorage.length; i++) {
    //         this.sendOfflineMessage(offlineMessageOnLocalStorage[i]);
    //       }
    //     }
    //   } else {
    //   }
    // });

    this.connectXampp();
  }

  ngAfterViewInit() {
  }

  sendOfflineMessage(messageData) {
    var offlineMessageOnLocalStorage = [];
    offlineMessageOnLocalStorage = JSON.parse(
      localStorage.getItem("offline_message")
    );
    var index = offlineMessageOnLocalStorage.findIndex(
      x => x.timestamp == messageData.timestamp
    );

    var currentTimestamp = new Date().getTime();
    if (messageData.message_type == "chat") {
      // this.chatService.sendMessage(
      //   messageData.to,
      //   messageData.message,
      //   messageData.from,
      //   currentTimestamp
      // );
      console.log("offline message send", messageData);
      if (index !== -1) {
        offlineMessageOnLocalStorage.splice(index, 1);
        localStorage.setItem(
          "offline_message",
          JSON.stringify(offlineMessageOnLocalStorage)
        );
        console.log("offline message clear", messageData);
      }
    } else if (messageData.message_type == "groupChat") {
      var groupId = messageData.to.split("@");
      // this.chatService.connectChatRoom(groupId[0]);
      // this.chatService.sendMessageToRoom(messageData.to, messageData.message);
      console.log("offline group message send", messageData);
      if (index !== -1) {
        offlineMessageOnLocalStorage.splice(index, 1);
        localStorage.setItem(
          "offline_message",
          JSON.stringify(offlineMessageOnLocalStorage)
        );
        console.log("offline group message clear", messageData);
      }
    }
  }

  onMouseOver() {
    this.imgSrc = "../../../assets/images/profile_arrow_icon_down.png"
  }

  onMouseOut() {
    if (this.currentUser.statusImgSrc) {
      this.imgSrc = this.currentUser.statusImgSrc;
    } else {
      this.imgSrc = "";
    }
  }

  // logOut(e) {
  //   var accessToken = JSON.parse(localStorage.getItem("token"));
  //   var currentUserId = this.acServices.currentUser.id;

  //   Swal({
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

  //       navigator.serviceWorker.getRegistrations().then(
  //         function (registrations) {
  //           for (let registration of registrations) {
  //             registration.unregister();
  //           }
  //         });

  //       var res = this.acService.logOut();
  //       if (res) {
  //         this.router.navigate(["/Signin"]);
  //         this.chatService.disconnect();
  //         this.titleService.setTitle(GlobalValue.title_name);
  //       }
  //     }
  //   });
  // }

  pushNotification(data) {
    var payload = JSON.parse(data.data.payload);
    // if (data.data.type === '9' && !!payload)
    //   this.incomingCallHandler(payload)
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
      // this.chatService.checkConnection(user);
      var globalRetryValue = 0;
      // this.chatService.onConnect$.subscribe(onConnect => {
      //   console.log(onConnect);
      //   console.log("globalRetryValue: ", globalRetryValue);
      //   if (onConnect == false) {
      //     globalRetryValue++;
      //     if (globalRetryValue <= 5) {
      //       this.chatService.checkConnection(user);
      //     }
      //   } else {
      //     globalRetryValue = 0;
      //   }
      // });
    }, 3000);
  }

  onlineStatusChange(status) {
    // this.chatService.setStatus(status);
  }

  goToSetupView() {
    this.setupViewEEmitter.emit(true)
  }

  // goToCallView(e){
  //   this.callViewEEmitter.emit(true)
  // }

  // incomingCallHandler(payload) {
  //   if (payload.action === 'member_join') this.incomingCallDialog(payload)
  // }

  // incomingCallDialog(payload){
  //   this.dialog.open(IncomingComponent, {
  //     panelClass: 'incoming-call-dialog-container',
  //     width: '20%',
  //     disableClose: true,
  //     data: payload
  //   });
  // }
}
