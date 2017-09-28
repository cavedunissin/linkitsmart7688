var mcs = require('mcsjs');
var exec = require('child_process').exec;
var deviceId = 'Input your deviceId';
var deviceKey = 'Input your deviceKey';
var dataChnId = 'Input your `video stream` data channel Id';
var width = 176;   //影像寬度
var height = 144;   //影像高度
var myApp = mcs.register({
  deviceId: deviceId,
  deviceKey: deviceKey,
});
//以下指令會呼叫ffmpeg套件來啟動影像串流
exec('ffmpeg -s ' + width + 'x' + height + ' -f video4linux2 -r 30 -i /dev/video0 -f 
mpeg1video -r 30 -b 800k http://stream-mcs.mediatek.com/' + deviceId + '/' 
+deviceKey + '/' + dataChnId + '/' + width + '/' + height, function(error, stdout, 
stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
