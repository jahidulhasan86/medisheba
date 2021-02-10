// ===== File globals.ts
// Global Config Goes Here
"use strict";

let is_Local_Build = "false"; // "true" = Locally/ "false" = Live"

let http = "http://";
let https = "https://";

// if you want to switch you server jst comment/uncomment below 2 line

// let serverDomain = 'api.protect2gether.com/';
let serverDomain = "hub.sensor.buzz/";

let serverUrl = https + serverDomain;
let profilePhotoUpload_ServerUrl =
  serverDomain == "hub.sensor.buzz/" ? "http://103.78.248.70:4002/" : serverUrl;

export const GlobalValue = {
  medi_connect_url:
    is_Local_Build == "true"
      ? "" + serverUrl + "mediconnect/api/v1"
      : "" + serverUrl + "mediconnect/api/v1",

  tasktracker_Service_Url:
    is_Local_Build == "true"
      ? "" + serverUrl + "task-tracker/api/v1"
      : "" + serverUrl + "task-tracker/api/v1",

  Recording_Service_Url:
    is_Local_Build == "true"
      ? "http://192.168.102.233:4060/api/v1"
      : "" + serverUrl + "media-reporter/api",

  smart_city_Service_Url:
    is_Local_Build == "true"
      ? "http://192.168.102.65:3080/api/v1"
      : "http://192.168.102.65:3080/api/v1",

  alert_circel_Service_Url:
    is_Local_Build == "true"
      ? "http://192.168.102.233:4002/api/v1"
      : "" + serverUrl + "iuser/api/v1",

  // video_hub_Service_Url : is_Local_Build == "true" ? "http://192.168.102.233:3600/api/v1" : "http://192.168.102.74:3600/api/v1",
  video_hub_Service_Url:
    is_Local_Build == "true"
      ? "http://192.168.102.233:3600/api/v1"
      : "" + serverUrl + "vsb/api/v1",

  notification_url:
    is_Local_Build == "true"
      ? "http://192.168.102.232:3520/api/v1"
      : "" + serverUrl + "notifier/api/v1",

  profilePhotoUrl:
    is_Local_Build == "true"
      ? "http://192.168.102.233:4002/"
      : serverUrl,

  ejabberdServiceUrl:
    is_Local_Build == "true"
      ? "http://35.161.244.20:3030/"
      : "http://35.161.244.20:3030/",

  // mailer_url: is_Local_Build == "true" ? "http://192.168.102.205:4000/api/v1" : "http://192.168.102.205:4000/api/v1",

  chatServiceURL:
    is_Local_Build == "true"
      ? "http://192.168.102.232:3030/api/v1"
      : "" + serverUrl + "chat/api/v1",

  chatwss:
    is_Local_Build == "true"
      ? "ws://192.168.102.232:5280/websocket/"
      : "wss://" + serverDomain + "/chatserver/websocket/",

  geofenceServiceUrl:
    is_Local_Build == "true"
      ? "http://192.168.102.233:3505/api/v1"
      : "" + serverUrl + "geo-fence/api/v1",

  locationGetUrl:
    is_Local_Build == "true"
      ? "" + serverUrl + "location/receiveLocationData"
      : "" + serverUrl + "location/receiveLocationData",

  locationPostUrl:
    is_Local_Build == "true"
      ? "" + serverUrl + "location/saveLocationData"
      : "" + serverUrl + "location/saveLocationData",

  vxmlServiceUrl:
    is_Local_Build == "true"
      ? "http://52.221.3.83/api/v1"
      : "https://dialengine.sensor.buzz/api/v1",

  googleMapApiKey:
    is_Local_Build == "true"
      ? "AIzaSyCdRjEKrzYALbcgy8UqardJa0n54Lml3XU"
      : "AIzaSyB1L9PaICXQEQxz63Z6e2ECmWuHGpZCRmA",

  broadcastMessage_BaseUrl:
    is_Local_Build == "true"
      ? "http://192.168.102.233:3529/api/v1"
      : "" + serverUrl + "broadcaster/api/v1",

  airlineFlightList_Url:
    is_Local_Build == "true"
      ? "https://aviation-edge.com/v2/public/timetable?key=a7eb2b-555949&iataCode=DOH"
      : "https://aviation-edge.com/v2/public/timetable?key=a7eb2b-555949&iataCode=DOH",

  dialEngine_url:
    is_Local_Build == "true"
      ? "dialengine.sensor.buzz"
      : "dialengine.sensor.buzz",

  dialEngineSocket_url:
    is_Local_Build == "true"
      ? "wss://dialengine.sensor.buzz:8082"
      : "wss://dialengine.sensor.buzz:8082",

  jazzware_Service_Url:
    is_Local_Build == "true"
      ? "http://192.168.102.233:3100/api/v1"
      : "https://messageout.sensor.buzz/api/v1",

  floor_websocket_Url:
    is_Local_Build == "true"
      ? "wss://" + serverDomain + "bfcp"
      : "wss://" + serverDomain + "bfcp",

  openvidu_server_Url:
    is_Local_Build == "true"
      ? "https://52.221.45.167:4443"
      : "https://bd.mediaserver.jagajag.com",

  openvidu_server_secret: is_Local_Build == "true" ? "SSB_2019" : "SSB_2019",

  freeswitch_service_url:
    is_Local_Build == "true"
      ? serverUrl + "freeswitch/api/v1"
      : serverUrl + "freeswitch/api/v1",

  // for production
  //app_id :"81e1bf45-fac4-4c07-8c56-a9d62abd9d74" ,  //L2T
  app_id: "34033870-802c-4349-b8a6-d48212d7c507", //"81e1bf45-fac4-4c07-8c56-a9d62abd9d74" ,  //Airline Connect (Technuf build)
  app_name: "Medi Sheba",
  app_logo: "" + serverUrl + "assets/images/ic_launcher.png", // videoChatConnet

  company_id: "7ecaf792-e9bd-412d-9988-5f3613deab57", //Technuf LLC.
  // company_id:  "e127b1e4-d345-4295-947f-e17306507c95",  // Amazon Server Default-- build on api.protect2....
  company_name: "Technuf LLC.",

  // host:"hub.sensor.buzz",
  // host: "api.protect2gether.com",
  host: "airconnect.sensor.buzz",

  footer_text_display: "Copyright © 2020 Medi Sheba. All Right Reserved",
  app_name_display: "Medi Sheba",
  title_name: "Medi Sheba",

  default_company_name: "Technuf LLC.",
  default_company_logo: require("src/assets/images/Technuf-Logo.gif"),
  company_logo_when_no_logo_found: require("src/assets/images/logo-default.png"),
  interval_value: 30000, ///////1 minute 1 sec = 1000
  server_cick_out_threshold: 1,
  conferenceServerSocket: "https://videoengine.sensor.buzz",
  recordingServerSocket: "52.43.246.6:9500",
  jsonrpc_version: "2.0",
  recording_base_url: "http://mediaengine.sensor.buzz/recordings/",
  summary_sensor_data_interval: 600000, ////10 minut,
  group_tag_settings: ["topic", "my_group", "geogroup"], //'topic', 'my_group', 'geogroup', 'flight', 'radio_group',
  connection_network_threshold: 60, // in seconds,

  hospital_id: "7ecaf792-e9bd-412d-9988-5f3613deab57"
};


export let online_status_display = {
  online: 'Available',
  away: 'Away',
  busy: 'Do not disturb',
  invisible: 'Invisible'
};

export let online_status_xmpp = {
  online: 'chat',
  away: 'away',
  busy: 'dnd',
  invisible: 'xa'
};

export let group_type = {
  GROUP_TYPE_GENERAL: 0,
  GROUP_TYPE_PINNED: 1,
  GROUP_TYPE_FLIGHT: 2,
  GROUP_TYPE_GEO: 3
};
