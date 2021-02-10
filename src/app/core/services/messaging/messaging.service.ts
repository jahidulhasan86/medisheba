import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { GlobalValue } from '../../../global';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { GlobalServices } from '../../../services/global_services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalServices } from '../global/global_services';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  currentMessageCast = this.currentMessage
  onTokenChange$: Observable<any>;
  private tokenChangeListner = new Subject<any>();
  deviceInfo = null;
  public currentUser

  cancelfriend$ = new BehaviorSubject(null);
  cancelfriendCast = this.cancelfriend$.asObservable()

  unfriend$ = new BehaviorSubject(null);
  unfriendCast = this.unfriend$.asObservable()

  declineFrnd$ = new BehaviorSubject(null);
  declineFrndCast = this.declineFrnd$.asObservable()

  isFriendShow$ = new BehaviorSubject(null);
  isFriendShowCast = this.isFriendShow$.asObservable()

  isPendingFriendShow$ = new BehaviorSubject(null);
  isPendingFriendShowCast = this.isPendingFriendShow$.asObservable()

  notifCount$ = new BehaviorSubject(null);
  notifCountCast = this.notifCount$.asObservable()

  frndAcceptNotifCount$ = new BehaviorSubject(null);
  frndAcceptNotifCountCast = this.frndAcceptNotifCount$.asObservable()

  frndPendingtNotifCount$ = new BehaviorSubject(null);
  frndPendingtNotifCountCast = this.frndPendingtNotifCount$.asObservable()


  constructor(
    public gSS: GlobalServices,
    public angularFireDB: AngularFireDatabase,
    public angularFireAuth: AngularFireAuth,
    public angularFireMessaging: AngularFireMessaging,

    private http: HttpClient,
    public deviceService: DeviceDetectorService) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
    this.onTokenChange$ = this.tokenChangeListner.asObservable();
    this.deviceInfo = deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
 async requestPermission(userId?): Promise<any> {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.tokenChangeListner.next(token);
        return token;
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  updateToken(userId, token) {
    console.log('update token : ' + token)
    let req = {
      "user_id": userId,
      "device_id": userId + '-' + this.deviceInfo.userAgent,
      "reg_token": token
    }
    var url = GlobalValue.notification_url + "/notifications/register";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };
    return this.http.post(url, req, httpOptions)
      .pipe(
        map((x: any) => {
          let res = x
          console.log(res)
          var resObj = res.result;
          if (resObj != null && resObj) console.log('Update Token to server is finished.');
          localStorage.setItem('pubsub', JSON.stringify(res.result));
          this.gSS.notificationServer.next(true)
          return res
        }
        ), catchError((error: Response) => {
          this.gSS.notificationServer.next(false)
          return throwError(error);
        })
      )
  }

  unregisteredDevice(userId) {
    let req = {
      "device_id": userId + '-' + this.deviceInfo.userAgent
    }

    var url = GlobalValue.notification_url + "/notifications/unregister";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.post(url, req, httpOptions)
      .pipe(
        map((x: any) => {
          let res = x
          console.log(res)
          var resObj = res.result;
          if (resObj != null && resObj) console.log('Update Token to server is finished.');
          var token = localStorage.getItem("firebasetoken");
          if (token) {
            this.angularFireMessaging.deleteToken(token).subscribe(
              (token) => {
                this.tokenChangeListner.next(token);
                return token;
              },
              (err) => {
                console.error('Unable to get permission to notify.', err);
              }
            );
          }
          return res
        }
        ), catchError((error: Response) => {
          return throwError(error);
        })
      )
  }

  setTokenSentToServer(sent) {
    localStorage.setItem('sentToServer', sent ? '1' : '0');
  }
  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}