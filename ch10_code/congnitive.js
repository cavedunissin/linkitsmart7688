'use strict';

var express = require("express");
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var request = require('request');
var fs = require('fs');
var Fdata=[{faceId:'......', faceAttributes:{gender:'....',age:0}}];
var exec = require('child_process').exec;
var exec2 = require('child_process').exec;
var hasOwnProperty = Object.prototype.hasOwnProperty;

app.use(express.static('static'));

//-----child_process-----//
exec('mjpg_streamer -i "input_uvc.so -f 20 -d /dev/video0" -o "output_http.so" ',      
    function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
console.log('exec error: ' + error);
     }
});
  console.log('camera on!');

app.get('/',function(req,res){
      res.sendFile(__dirname+'/static/index.html');
});

//-----socket on -----//
io.on('connection',function (socket) {
  console.log("Linked");
  });

//在此指定連線埠號為3000
server.listen(3000,function(){
    console.log("Working on port 3000");
    setInterval(function () {
//開啟影像串流，請在此修改 LinkIt Smart IP
      console.log("New readFile...");
      exec2('wget http://[linkit7688IP]:8080/?action=snapshot -O output.jpg', 
function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);  //如發生錯誤由此處理
        }
      });

//讀取jpg檔並發送到cognitive API，請在此填入Face API金鑰
      fs.readFile("./output.jpg", function(err, data) {
      request({
          method: 'POST',
          url: 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender',
          headers: {
              'Content-Type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': 'your Face API key'
          },
          body:data
      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {  //無錯誤且連線成功
              Fdata =JSON.parse(body);            //解析Face相關資料
              console.dir(Fdata, {depth: null, colors: true});
              if (isEmpty(Fdata)) {
                console.log("No face detect!");  //未偵測到任何臉孔
                io.emit('message',{'id':'No Face'});
              }
              else {
                console.log('Face Detect');                io.emit('message',{'id':Fdata[0].faceId,'gender':Fdata[0].faceAttributes.gender,'age':Fdata[0].faceAttributes.age}); 
                //由此解析該臉孔的性別與年齡
              }
          }
      });
      //--------emotion API-----------
      request({
          method: 'POST',
          url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
          headers: {
              'Content-Type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': 'your Emotion API key'
          },
          body: data
      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {       //無錯誤且連線成功
              var object = JSON.parse(body);             //解析emotion相關資料
              console.dir(object, {depth: null, colors: true});
          }
      });
      });
    },3000)
});

function isEmpty(obj) {  //檢查是否有null或未定義物件
    if (obj == null) return true;
    //如果該物件長度>0或具有非0數值，則該視為一個正確物件
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    //檢查是否有其他屬性
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
