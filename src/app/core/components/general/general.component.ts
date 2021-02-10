import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  
  @Output() setupViewEvtEmitter = new EventEmitter<any>()

  isCallViewShow = false

  constructor(private router: Router) { }

  ngOnInit() {
  }

  setupViewEEmitter(event){
    this.setupViewEvtEmitter.emit(event)
  }
}
