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

//�b�����w�s�u�𸹬�3000
server.listen(3000,function(){
    console.log("Working on port 3000");
    setInterval(function () {
//�}�Ҽv����y�A�Цb���ק� LinkIt Smart IP
      console.log("New readFile...");
      exec2('wget http://[linkit7688IP]:8080/?action=snapshot -O output.jpg', 
function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);  //�p�o�Ϳ��~�Ѧ��B�z
        }
      });

//Ū��jpg�ɨõo�e��cognitive API�A�Цb����JFace API���_
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
          if (!error && response.statusCode == 200) {  //�L���~�B�s�u���\
              Fdata =JSON.parse(body);            //�ѪRFace�������
              console.dir(Fdata, {depth: null, colors: true});
              if (isEmpty(Fdata)) {
                console.log("No face detect!");  //������������y��
                io.emit('message',{'id':'No Face'});
              }
              else {
                console.log('Face Detect');                io.emit('message',{'id':Fdata[0].faceId,'gender':Fdata[0].faceAttributes.gender,'age':Fdata[0].faceAttributes.age}); 
                //�Ѧ��ѪR���y�ժ��ʧO�P�~��
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
          if (!error && response.statusCode == 200) {       //�L���~�B�s�u���\
              var object = JSON.parse(body);             //�ѪRemotion�������
              console.dir(object, {depth: null, colors: true});
          }
      });
      });
    },3000)
});

function isEmpty(obj) {  //�ˬd�O�_��null�Υ��w�q����
    if (obj == null) return true;
    //�p�G�Ӫ������>0�Ψ㦳�D0�ƭȡA�h�ӵ����@�ӥ��T����
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    //�ˬd�O�_����L�ݩ�
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}
