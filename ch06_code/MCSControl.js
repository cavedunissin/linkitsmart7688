var mcs = require('mcsjs');
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyS0",
{baudrate: 9600
});
var myApp = mcs.register({
        deviceId: ' Your device ID ',
        deviceKey: ' Your device key ',
});
myApp.on('LED_Control',function(data,time){
        if(Number(data)){
                serialPort.write("1\r");
        }
        else{
                serialPort.write("0\r");
        }
});
