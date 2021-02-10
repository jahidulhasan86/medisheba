

var sipStack;
var callSession = null;

$(document).ready(function() {
	SIPml.init(successSIPmlInit, errorSIPmlInit);
	if(SIPml.isWebRtcSupported())
	{
		console.log("WebRTC support found");
	}
	else
	{
		console.log("WebRTC support not found");
		document.getElementById("body").innerHTML = "WebRTC is not supported on your browser";
	}

	$('#temp1').click(powerOnChannel);	//TODO pass arguments containing channel info
});

function errorSIPmlInit(e) {
	console.log('Error in setting up the sip stack: ' + e);
	document.getElementById("body").innerHTML = "Failed to initialize sip stack";
}

function successSIPmlInit(e) {
	console.log('SIPml.init success');
	sipStack = new SIPml.Stack({
        realm: '10.194.150.183',
        impi: 'bob',
        impu: 'sip:bob@10.122.70.141',
        display_name: 'Bob', 
        ice_servers: [],
        events_listener: { events: '*', listener: sipListenerFunc }, 
        sip_headers: [ 
           	{name: 'User-Agent', value: 'IPICS Browser Based Client'}, 
           	{name: 'Organization', value: 'Cisco'}
        	]
    });
}

function powerOnChannel(){
	if(sipStack.setConfiguration({
		realm: '10.194.150.183',		//IP address of UMS
		//ice_servers: [{url:"stun:171.68.114.125:3478"}],	//IP address of STUN server
		ice_servers: [],
		enable_rtcweb_breaker: true,
		outbound_proxy_url: 'udp://10.194.150.183:5060',		//UMS details
		websocket_proxy_url: 'ws://10.194.236.127:5062',		//webrtc2sip details
		enable_early_ims : false,
        enable_media_stream_cache : true,
        bandwidth: { audio: undefined, video: undefined },
        sip_headers: [ 
           	{name: 'User-Agent', value: 'IPICS Browser Based Client'}, 
           	{name: 'Organization', value: 'Cisco'}
        	]
	}) != 0)
		console.log("SIP config not accepted");
	else
	{
		console.log("SIP config accepted");

		if(sipStack.start() != 0)
		{
			console.log("Failed to establish connection with the socket server");
			document.getElementById("body").innerHTML = "UMS unreachable";
		}
		else
		{
			console.log("Trying to connect to UMS");
			document.getElementById("body").appendChild(document.createTextNode("UMS Connecting"));
		}
	}
}

function sipListenerFunc(e){
	if (e.type == 'started') {
		console.log("Call Events Listener: SIP Stack start signalled. Placing call");
		placeCall();
	} 
	else if (e.type == 'stopped') {
		console.log("SIP Stack Event: Sip stack stopped.");

	} 
	else if (e.type == 'i_new_call') {
		console.log('Incoming call');
		if(callSession == null){
			callSession = e.newSession;
			console.log('Accepting call from: ' + callSession.getRemoteFriendlyName());
			callSession.setConfiguration({
			audio_remote : document.getElementById('audio-remote'),
			events_listener : {
				events : '*',
				listener : callEventsListener
				} 
			});
			callSession.accept();
			var newElement = document.createElement('div');
			newElement.innerHTML = "<button type = 'button' id = 'hangup'>Click to end call</button>";
			document.getElementById('body').appendChild(newElement);
			$('#hangup').click(hangUp);
		}
	}
	else if(e.type == 'i_new_message'){
		//TODO
	}
	else
		console.log('SIP stack event fired: ' + e.type +" " + e.description);
}

function placeCall() {
	callSession = sipStack.newSession('call-audio',
		{
			audio_remote : document.getElementById('audio-remote'),
			events_listener: { 
				events: '*', 
				listener: callEventsListener 
			}
		});
	if(callSession.call('2416@10.194.150.183') != 0){	//TODO
		console.log("Call failed");
	}
}

function callEventsListener(e){
	if(e.type = 'connecting'){
		console.log('Call Events Listener: Call connecting: ' + e.type +' '+ e.description);
		callSession.dtmf('1');
		console.log('Sending DTMF');
	}
	else if(e.type == 'connected'){
		console.log('Call Events Listener: Channel connection established');
		callSession.dtmf('1');
		console.log('Sending DTMF');
	}
	else if(e.type == 'terminated'){
		console.log('Call Events Listener: Channel connection terminated. Response code: '+ e.getSipResponseCode());
		callSession = null;	//TODO
	}
	else if(e.type == 'media_added'){
		console.log("Call Events Listener: Media added: " + e.type + ' '+e.description + ' ' + e.getSipResponseCode());
		callSession.dtmf('1');
		console.log('Sending DTMF');
	}
	else if(e.type == 'media_removed'){
		console.log("Call Events Listener: Media removed: " + e.getSipResponseCode());
	}
	else if(e.type == 'webrtc_error'){
		console.log("Call Events Listener: WebRTC error detected: "+e.type+' '+e.description);
	}
	else
		concole.log('Call Events Listener: ' + e.type+' '+e.description);
}

function hangUp() {
	console.log("Hanging up inbound call");
	if(callSession.hangup({
		events_listener : {events: '*', listener : callEventsListener}
	}) != 0)
		console.log('Failed to hangup');
	else{
		console.log('Hangup in process');
	}

}
//TODO power off current channel when switch is made to a different channel or page