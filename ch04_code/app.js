var mcs = require（'mcsjs'）;
var m = require（'mraa'）;
var myRelay = new m.Gpio（0）;

myRelay.dir（m.DIR_OUT）; //set LED pinmode to output

var myApp = mcs.register（{
     deviceId: '您的 DeviceId ',
     deviceKey: '您的 DeviceIKey',
}）;

myApp.on（' Relay_Control', function（data, time） {
 if（Number（data） === 1）{
     console.log（'blink'）;
     myRelay.write（0）;
 } else {
     console.log（'off'）;
     myRelay.write（1）;
 }
}）;
