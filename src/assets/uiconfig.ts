import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
// import { GeofenceService } from 'src/app/services/geofence/geofence.service';
// import { GlobalServices } from '../app/services/global_services';
import { AccountService } from 'src/app/core/services/account/account.service';
import { GlobalServices } from 'src/app/core/services/global/global_services';
// import {AccountService } from '../app/services/user_service/account.service';

export class UiConfig implements OnInit {
  isViewMoodOn: boolean;
  currentTab: any;
  public acServices; 
  // showView: any;
  constructor(
    public globalService: GlobalServices,
    public acService: AccountService) {
      this.acServices = acService;
  }

  ngOnInit() {
    this.globalService.currentSelectedTab.subscribe(result => {
      this.currentTab = result;
    })

    // this.showView = JSON.parse(localStorage.getItem("showView")); 
  }

  responsive(source?: string) {
    // this.showView = JSON.parse(localStorage.getItem("showView")); 
    var headerHeight = $('.header').height();
    var footerHeight = $('.footer').height();
    var toolbarContentHeight = 64;
    var geoAdd = $(".geo-add").height();
    var sideNav = $("#sideTab").width();
    var inBuildingElement = $("#inBuildingElement").height()

    var list_search = $(".list_search").height()
    var headerTopLeft_part1 = $(".headerTopLeft-part1").height()
    var headerTopLeft_part2 = $(".headerTopLeft-part2").height()
    var multicompany = $(".multicompany").height()
    var friend_request = $(".friend_request").height()
    var processing = $(".processing").height()
    var actionMenuBar = $(".actionMenuBar").height()
    var companyNameBar = $(".companyNameBar").height();

    if (list_search === undefined) {
      list_search = 0
    }

    if (multicompany === undefined) {
      multicompany = 0
    }

    if (friend_request === undefined) {
      friend_request = 0
    }

    if (processing === undefined) {
      processing = 0
    }

    if (actionMenuBar === undefined) {
      actionMenuBar = 0
    }

    if (companyNameBar === undefined) {
      companyNameBar = 0
    }


    // $(".list_item").css("height", (window.innerHeight - headerHeight - actionMenuBar - list_search - multicompany - friend_request - processing - companyNameBar));
    $(".list_item").css("height", (window.innerHeight - (50 + headerTopLeft_part1 + headerTopLeft_part2 + list_search + actionMenuBar)));

    var editGeoButton: any;
    editGeoButton = document.getElementById('editGeoButton');
    console.log('currentTab', source);
    // if(source == 'gridView'){
    //   $("#chatBoxUL").css("height", ($(".chat_test").height() - ($(".action-titles").height() + $("#sendInput").height())));
    //   $("#chatBoxUL").css("width", ($(".chat_test").width() - 2) + "px");
    // } else {
    //   $("#chatBoxUL").css("height", window.innerHeight - (headerHeight + footerHeight + toolbarContentHeight + 80))
    // }
    $("#chatBoxUL").css("max-height", window.innerHeight - (headerHeight + footerHeight + toolbarContentHeight + 80))
    $(".mapDiv").css("max-height", window.innerHeight - (headerHeight + footerHeight + toolbarContentHeight))

    $(".agm-map").css("height", (window.innerHeight - (headerHeight + footerHeight)))
    // $(".geo-add").css("height", (window.innerHeight - (headerHeight + footerHeight)))
    $(".smart_agm-map").css("height", (window.innerHeight - (headerHeight)))
    $(".agm-map_view_mode").css("height", window.innerHeight - (headerHeight + footerHeight))
    $(".mainPanelLogin").css("height", window.innerHeight)
    $(".leftPart").css("height", window.innerHeight)
    $(".rightPart").css("height", window.innerHeight)
    // $(".write-msg").css("width", window.innerWidth - 320)
    $(".groupBody").css("height", window.innerHeight - (64 + 65 + 30))
    $(".wlcomeImage").css("height", window.innerHeight - (headerHeight+footerHeight+60));
    $("#main-middle-part").css("height", window.innerHeight - (headerHeight+footerHeight+7));
    $("#main-right-part").css("height", window.innerHeight - (headerHeight+footerHeight+7));
    // if(this.showView != 'admin') $(".mat-drawer-content").css("height", window.innerHeight);

    console.log(window.innerHeight, headerHeight, footerHeight, toolbarContentHeight)

    $(".firstPart").css("height", (window.innerHeight * 0.11));
    $(".secondPart").css("height", (window.innerHeight * 0.33));
    $(".thirdPart").css("height", (window.innerHeight * 0.53));
    $(".fourthPart").css("height", (window.innerHeight * 0.03));

    $(".smart-city-details").css("height", (window.innerHeight - (headerHeight)))
    $(".canvas_element").css("height", (window.innerHeight - (headerHeight + footerHeight)))
    $(".dash_board_manager").css("height", window.innerHeight - (headerHeight + footerHeight))
    // $("#ptt-ptv-screen").css("height", window.innerHeight - (headerHeight + footerHeight + 50));

    $(".height_100").css("height", (window.innerHeight - (headerHeight + footerHeight + 50)));
    $(".height_50").css("height", (window.innerHeight - (headerHeight + footerHeight + 50)) / 2);

    //set the height of right part
    var mainRightHeight = $("#main-right-part").height();
    //$(".main-right-activeCalls-part").css("height", (mainRightHeight * .4));
    $(".main-right-alerts-part").css("height", mainRightHeight );

    // chatBoxChange();
    function chatBoxChange() {
      // this.showView = JSON.parse(localStorage.getItem("showView")); 
      var editGeoButton: any;
      editGeoButton = document.getElementById('editGeoButton');

      var headerHeight = $(".header").height();
      var footerHeight = $(".footer").height();
      var toolbarContentHeight = $(".toolbar-content").height();
      var sideNav = $("#sideTab").width();
      // var geoAdd = $(".geo-add").height();
      // if(source == 'gridView'){
      //   $("#chatBoxUL").css("height", ($(".chat_test").height() - ($(".action-titles").height() + $("#sendInput").height())));
      //   $("#chatBoxUL").css("width", ($(".chat_test").width() - 2) + "px");
      // } else {
      //   $("#chatBoxUL").css("height", window.innerHeight - (headerHeight + footerHeight + toolbarContentHeight + 80))
      // }
      $(".mapDiv").css("max-height", window.innerHeight - (headerHeight + footerHeight + toolbarContentHeight))

      $(".agm-map").css("height", (window.innerHeight - (headerHeight + footerHeight)))
      $(".smart_agm-map").css("height", (window.innerHeight - (headerHeight)))
      $(".wlcomeImage").css("height", window.innerHeight - (headerHeight+footerHeight+60));
      $("#main-middle-part").css("height", window.innerHeight - (headerHeight+footerHeight+7));
      $("#main-right-part").css("height", window.innerHeight - (headerHeight+footerHeight+7));
      // if(this.showView != 'admin') $(".mat-drawer-content").css("height", window.innerHeight);


      $(".mainPanelLogin").css("height", window.innerHeight)
      $(".leftPart").css("height", window.innerHeight)
      $(".rightPart").css("height", window.innerHeight)
      // $(".write-msg").css("width", window.innerWidth - 320)
      // $("mat-nav-list").css("height", window.innerHeight -(64+65+30))
      $(".groupBody").css("height", window.innerHeight - (64 + 65 + 30))
      // $(".landing-page").css({"min-height" : window.innerHeight -(64+30), "height": window.innerHeight -(64+30)})
      console.log(window.innerHeight, window.innerWidth, headerHeight, footerHeight, toolbarContentHeight);
      $(".firstPart").css("height", (window.innerHeight * 0.11));
      $(".secondPart").css("height", (window.innerHeight * 0.33));
      $(".thirdPart").css("height", (window.innerHeight * 0.53));
      $(".fourthPart").css("height", (window.innerHeight * 0.03));


      $(".smart-city-details").css("height", (window.innerHeight - (headerHeight)))
      $(".canvas_element").css("height", (window.innerHeight - (headerHeight + footerHeight)))
      $(".dash_board_manager").css("height", window.innerHeight - (headerHeight + footerHeight))
      // $("#ptt-ptv-screen").css("height", window.innerHeight - (headerHeight + footerHeight + 50));

      $(".height_100").css("height", (window.innerHeight - (headerHeight + footerHeight + 50)));
      $(".height_50").css("height", (window.innerHeight - (headerHeight + footerHeight + 50)) / 2);
      // $(".list_item").css("height", (window.innerHeight - headerHeight - actionMenuBar - list_search - multicompany - friend_request - processing - companyNameBar));
      $(".list_item").css("height", (window.innerHeight - (50 +  headerTopLeft_part1 + headerTopLeft_part2 + list_search + actionMenuBar)));
 
      //set the right part height
      var mainRightHeight = $("#main-right-part").height();
      //$(".main-right-activeCalls-part").css("height", (mainRightHeight * .4));
      $(".main-right-alerts-part").css("height", mainRightHeight );

    }

    $(window).resize(function () {
      chatBoxChange();
    });

  }


  // rightPartRespons(){
  //   rightPartResponsive();

  //   function rightPartResponsive(){

  //   }
  //   $(window).resize(function () {
  //     rightPartResponsive();
  //   });
  // }

  dispathcedResponsive() {
    dispathcerResponsive();

    function dispathcerResponsive() {
      var headerHeight = $('.header').height();
      var footerHeight = $('.footer').height();
      var restOf_totalHeight = window.innerHeight - (headerHeight + footerHeight);
      var bottom_tab_height = 40;
      $(".layout-main, .leftOne, .layout-right").css("height", restOf_totalHeight);
      $(".layout-left, .layout-middle").css("height", (restOf_totalHeight));

      $(".recent").css("height", $('.layout-left').height() * .20);
      $(".group").css("height", $('.layout-left').height() * .35);
      $(".contact").css("height", $('.layout-left').height() * .35);
      $(".left-bottom").css("height", $('.layout-left').height() * .08);

      // Left Part
      // white-bar-small + white-bar-small height = 20+20= 40
      $(".recent-data").css('height', ($('.layout-left').height() * .20) - 40);
      $(".group-data").css('height', ($('.layout-left').height() * .35) - 40);
      $(".contact-data").css('height', ($('.layout-left').height() * .35) - (40 + 24)); // 24 = 20 (search bar height) + 2+2(margin top+bottom)

      // Middle Part
      // white-bar-big + white-bar-medium height = 35+25= 60
      // .middle-top-bar-tab .mat-tab-body-content
      setTimeout(() => {
        $(".main-data").css('height', ($('.layout-main').height() * .95) - 60);
        // $(".middle-top-bar-tab .mat-tab-body-content").css('height', ($('.layout-main').height() * .95) - 60 ,'px !important');
      }, 200);

      // right part
      // white-bar-small height = 20
      $(".speedDial-part").css('height', ($('.layout-right').height() * .38));
      $(".speedDial-data").css('height', ($('.speedDial-part').height() * .95) - 20);
      $(".quickCall-data").css('height', ($('.speedDial-part').height() * .95) - 20);
      $(".speedDiallist").css('height', ($('.speedDial-data').height()) - 45);


      $(".alerts-part").css('height', ($('.layout-right').height() * .30));
      $(".alert-data").css('height', ($('.alerts-part').height() * .95) - 20);
      $(".alertList").css('height', ($('.alert-data').height()) - 45);

      $(".activeCall-part").css('height', ($('.layout-right').height() * .30));
      $(".activeCall-data").css('height', ($('.activeCall-part').height() * .95) - 20);
      $(".main-box-list").css('height', $('.activeCall-data').height() - 55); // 20(main-box-listTitle) + 35(header-box)
    }

    $(window).resize(function () {
      dispathcerResponsive();
    });
  }

  friendListHeight() {

  }

}
