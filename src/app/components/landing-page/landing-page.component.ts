import { Component, OnInit } from '@angular/core';
import { UiConfig } from '../../../assets/uiconfig'
import { AccountService } from '../../services/user_service/account.service'
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public appName;
  constructor(public acService : AccountService) {

  }

  ngOnInit() {
    UiConfig.prototype.responsive();
    this.acService.appNameChange('SensorBuzz Collaboration Hub')
  }

}
