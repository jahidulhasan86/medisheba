import { Injectable } from '@angular/core';
import { GlobalValue } from '../../../global';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, concatMap, mergeMap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loginUrl = GlobalValue.alert_circel_Service_Url + '/account/signin';
  private chatRegistrationURL = GlobalValue.chatServiceURL + '/chat/register';
  private profileUpdateURL = GlobalValue.alert_circel_Service_Url + '/user/update';
  private profilePicUploadUrl = GlobalValue.alert_circel_Service_Url + '/user/profilepic'
  private getTokenUrl = GlobalValue.alert_circel_Service_Url + '/account/token';

  private signInURL = `${GlobalValue.alert_circel_Service_Url}/account/signin`;
  private getTokenURL = `${GlobalValue.alert_circel_Service_Url}/account/token`;

  public currentUser = null;


  // for call test start
  private addConferenceUrl = GlobalValue.video_hub_Service_Url + '/conference/addConference';
  private getConferenceByUserIdsAndTypeUrl = GlobalValue.video_hub_Service_Url + '/conference/getConferenceByUserIdsAndType'
  private makeCallServiceUrl = GlobalValue.video_hub_Service_Url + '/call/makeCall'
  // for call test end

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
  }

  ProfileUpdate(body) {
    console.log("<========Profile update service is called========>")
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    let profileUpdateBody = {
      first_name: body.first_name,
      last_name: body.last_name,
      gender: body.gender,
      date_of_birth: body.date_of_birth,
      address: body.address,
      contact: body.contact,
    }

    return this.http.post(this.profileUpdateURL, profileUpdateBody, httpOptions)
      .pipe(
        map((response: any) => {
          let result = response
          return result
        })
      )
  }

  profilePicUpload(files) {
    console.log("<========Profile picture upload service called========>")
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
    var formData = new FormData();
    formData.append('file', files);
    formData.append('Content-Type', 'multipart/form-data');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.post(this.profilePicUploadUrl, formData, httpOptions)
      .pipe(
        map((response: any) => {
          let result = response.json();
          return result
        }),
        catchError((error: Response) => {
          return throwError(error);
        })
      )
  }

  signIn(email: string, password: string): Observable<any> {
    console.log('<========Sign in service called========>');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ user_name: email, password: password, app_id: GlobalValue.app_id });
    return this.http.post(this.signInURL, body, { headers: headers }).pipe(
      map((x: Response) => x),
      map((x: any) => x.result),
      concatMap((x) => {
        return of(x).pipe(
          mergeMap((x) => {
            const user_info = x;

            const getTokenBody = {
              app_id: GlobalValue.app_id,
              company_id: x.user_session
                ? x.user_session.last_company_id != null
                  ? x.user_session.last_company_id
                  : GlobalValue.company_id
                : GlobalValue.app_id,
              access_token: x.access_token
            };

            console.log('<========Get token service service is called========>');
            return this.http.post(this.getTokenURL, getTokenBody, { headers: headers }).pipe(
              map((x: Response) => x),
              tap((x: any) => {
                const { access_token, app_id, company_id, role, is_company_admin } = x.result;
                Object.assign(user_info, {
                  access_token: access_token,
                  app_id: app_id,
                  company_id: company_id,
                  is_company_admin: is_company_admin,
                  role: role,
                  password: password
                });
                localStorage.setItem('sessionUser', JSON.stringify(user_info));
                localStorage.setItem('profile_pic', JSON.stringify(user_info.profile_pic));
                localStorage.setItem('token', JSON.stringify(user_info.access_token));
                this.currentUser = user_info;
                // this.userLoginGenerator(!!localStorage.getItem('sessionUser'));
                // this.authUserInfo.next(JSON.parse(localStorage.getItem('sessionUser')));
              })
            );
          })
        );
      }),
      catchError((error: Response) => {
        return throwError(error);
      })
    );
  }

  signOut() {
    this.currentUser = null;
    localStorage.clear();
    return of(true);
  }













  // for call test start
  _getConferenceByUserIdsAndType(FriendUserId: string, conferenceType: string) {
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
    console.log("<======== Get Conference By UserIds And Type Service Called========>")
    let userIds = [
      this.currentUser.id,
      FriendUserId
    ];
    let req = {
      "user_ids": userIds,
      "conference_type": conferenceType
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.post(this.getConferenceByUserIdsAndTypeUrl, req, httpOptions)
      .pipe(
        map((result: any) => result),
        map(x => {
          console.log(" from Get Conference By UserIds And Type function", x);
          return x;
        }),
        catchError((error: Response) => {
          return throwError(error)
        })
      )
  }

  _addConference(conferenceName: any, tags: any, userList?: string[], deviceList?: string[], region?: any, conferenceType?: any, conferenceMode?: boolean, isAllowContributor?: boolean, isPinned?: boolean, geofenceList?) {
    this.currentUser = JSON.parse(localStorage.getItem("sessionUser"));
    var currentUserInfo;
    console.log("<======== Add Conference Service Called========>")
    currentUserInfo = {
      user_id: this.currentUser.id,
      user_name: this.currentUser.user_name
    }
    userList.push(currentUserInfo)
    var name = conferenceName

    var req = {
      "conference_name": name,
      "users": userList,
      "devices": deviceList,
      "region": region,
      "conference_type": conferenceType,
      "is_pinned": isPinned,
      "is_allow_contributor": isAllowContributor,
      "geofences": geofenceList ? geofenceList : null,
      "tags": tags
    }

    console.log(req)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.post(this.addConferenceUrl, req, httpOptions)
      .pipe(
        map((result: any) => result),
        map(x => {
          console.log(" from Add Conference function", x);
          return x;
        }),
        catchError((error: Response) => {
          return throwError(error)
        })
      )
  }

  makeCall(conference_id, call_type, acknowledge_type, conference_type?) {
    console.log('=========Make call service called==============')
    let body: any = {
      "call_type": call_type,
      "id": conference_id,
      "acknowledge_type": acknowledge_type
    };
    if (conference_type) {
      body.is_audio = conference_type == '1' ? false : false
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      })
    };

    return this.http.post(this.makeCallServiceUrl, body, httpOptions)
      .pipe(
        map((x: any) => x),
        catchError((error: Response) => {
          return throwError(error);
        })
      )
  }
  // for call test end

}
