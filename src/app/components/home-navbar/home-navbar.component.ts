import { Component, OnInit, AfterViewInit, NgZone, ViewChild, Inject, OnDestroy } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
// import { Http } from '@angular/http';
// import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AccountService } from '../../services/user_service/account.service'
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// import { ChatService } from '../../chat.service';
import * as $ from 'jquery';
// import { MessagingService } from '../../messaging.service';
import { Subscription } from 'rxjs';
import { group } from '@angular/animations';
import { UiConfig } from '../../../assets/uiconfig';
import swal from 'sweetalert2';
// import { GlobalServices } from 'src/app/services/global_services';
// import Timer from 'easytimer';
import { GlobalValue } from '../../global';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/services/account/account.service';
import { MessagingService } from 'src/app/core/services/messaging/messaging.service';
import { GlobalServices } from 'src/app/core/services/global/global_services';
// const uuidv1 = require('uuid/v1');

declare var XMPPVideoRoom: any;
var api;
var xmpp;
var calDialogRef = null;
var isIncommingCall = null;
var jitsiContainer = null;
var conferenceApi = null;
declare var JitsiMeetExternalAPI: any;
var jitsiDomain = "";
var authUser = null;
var isConferenceRunning = false;
let isInConfSession = new Subject<boolean>();
var prevTarget = null;
var globGs;
var globalService;
var accService;
let currentTab = "";
// var timer = new Timer();
let memberJoinStatus;
let cConfType = "";
let isOtherPartyInCall = false;
let sanitizerObj: any;
let tOut = 0;
let toolBarContent: any;
let socket;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})

export class HomeNavbarComponent implements OnInit, OnDestroy {
  message;
  public acServices;
  public chatlist;
  public groupService;
  public msg;
  public sentUser;
  public roleList: Object;
  public userHierarchyList: Object;
  panelOpenState = false;
  public roleId;
  public selectedGroup;

  public contactShow = true;
  public chatShow = false;
  public meetingShow = false;
  public callShow = false;
  public taskShow = false;
  public notificationsShow = false;
  public groupShow = false;
  private messagingService: MessagingService;

  isTaskShowSub: Subscription
  joinTextShowHideCastSub: Subscription
  openDashboardCastSub: Subscription
  openConferenceSummaryCastSub: Subscription
  openUsersConferenceCastSub: Subscription
  openRecordingsCastSub: Subscription
  openChattingWindowCastSub: Subscription
  openGeoFenceManagementWindowsCastSub: Subscription
  openAddPredefinedAlertWindowsCastSub: Subscription
  openPttPtvScreenWindowCastSub: Subscription
  isItIncommingCallSub: Subscription
  isCallSessionRunningSub: Subscription
  callTimerCastSub: Subscription
  getMemberJoinStatusCastSub: Subscription

  isShowJoinText;
  isShowDashboard;
  isShowingStdDashBoard;
  isShowingTeacherDashBoard;
  isShowSummary;
  isShowUserConference;
  isShowRecordings;
  isShowChattingWindow;
  isShowGeoFenceManagement;
  isShow_AddPredefinedAlert;
  isShow_PttPTvScreen;
  isShow_GridView;
  isShowingXmView;
  isShowingLiveXmView;
  isShowingViewXmView
  isShowingTeacherXmView
  isShowingTeacherQuestionView

  public targetUrl: SafeResourceUrl;
  trustedUrl: SafeUrl;
  dangerousRtspUrl;
  isAdminDashboard: any;
  isCallSession: any;

  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver, protected sanitizer: DomSanitizer,
    public dialog: MatDialog, public acService: AccountService, public router: Router, messagingService: MessagingService,
    public globalService: GlobalServices,
    public gServices: GlobalServices, private gs: GlobalServices,
    private route: ActivatedRoute) {
    this.messagingService = messagingService;
    accService = acService;
    sanitizerObj = this.sanitizer
  }

  events: string[] = [];
  users: string[] = [];
  opened: boolean;
  dummyUser = [];
  groups = [];

  ngOnInit() {
    UiConfig.prototype.responsive();
    this.messagingService.receiveMessage()
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }
}
