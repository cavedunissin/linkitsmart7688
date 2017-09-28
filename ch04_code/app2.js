var ledPin = 13;
var firmata = require（'firmata'）;
var mcs = require（'mcsjs'）;
var board = new firmata.Board（"／dev／ttyS0", function（err） {
if （err） {
 console.log（err）;
 board.reset（）;
 return;
}
console.log（'connected...'）;
console.log（'board.firmware: ', board.firmware）;
board.pinMode（ledPin, board.MODES.OUTPUT）;

var myApp = mcs.register（{
 deviceId: ' 你的DeviceId',
 deviceKey: '你的DeviceKey',
 host: 'api.mediatek.com'

}）;
myApp.on（'Analog_Control', function（data, time） {
 if（Number（data） != NaN） {
   board.analogWrite（ledPin, Number（data））;
 } else {
   board.analogWrite（ledPin, Number（data））;
 }
}）;
}）;
