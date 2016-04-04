
var SockJS = require('sockjs-client');

var Stomp = require('stompjs');
var stompClient;

global.connect = function() {
    var socket = new SockJS('https://spring-server-galileoacmpuj.c9users.io/hello'); 
    stompClient = Stomp.over(socket);
    stompClient.connect({}, todoBien, todoMal);
}

var todoBien = function(frame) {
    console.log('Me conecte al servidor ' + frame);
    
    stompClient.subscribe('/topic/greetings', processMessage);
    
}   

var todoMal = function(frame) {
    console.log('No me pude conectar ' + frame);
}

var processMessage = function(message) {
    message = JSON.parse(message.body); //Mensaje en formato JSON
}


//connect();


var disconnect = function() {
    
    if (stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    
}

function sendOrientation(name) {
    if (stompClient!=null){
        stompClient.send("/app/hello", {}, JSON.stringify({ 'name': name }));
    }
        
}

/*
function deviceOrientationHandler(tiltLR, tiltFB, dir, motionUD) {
    var socket = io.connect();
        socket.emit('update movement', { tilt_LR: Math.round(tiltLR), tilt_FB: Math.round(tiltFB)});
}
*/