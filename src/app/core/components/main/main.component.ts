import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() userInfo: any
  setupView: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.userInfo.role.role_name === 'Admin' && this.userInfo.role.role_type === '1') this.setupView = true
    else this.setupView = false
  }

  modeChanger(event){
    this.setupView = event
    if(this.setupView) this.router.navigate(['/dashboard']);
    if(!this.setupView) this.router.navigate(['/home']);
  }
}
