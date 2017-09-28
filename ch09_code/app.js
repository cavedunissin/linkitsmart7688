var watson = require('watson-developer-cloud');
var speak = require('./say');
var fs = require('fs');
var cp = require('child_process');
var cred = JSON.parse(fs.readFileSync('./my-stt-crendential.json'));
var stt = watson.speech_to_text({
	username: cred.credentials.username,
	password: cred.credentials.password,
	version: 'v1'
});

function listen() {
	var params = {
		model: 'zh-CN_BroadbandModel',
		content_type: 'audio/wav',
		continuous: true
	};

	var recognizeStream =  stt.createRecognizeStream(params);
	var record = cp.spawn('arecord', ['--device=plughw:1,0', '--rate=22000']);
	record.stderr.pipe(process.stderr);
	record.stdout.pipe(recognizeStream);
	recognizeStream.setEncoding('utf-8');
	recognizeStream.on('results', function(data) {
		if(data.results[0] && data.results[0].final && 
data.results[0].alternatives) {
			console.log(JSON.stringify(data, null, 2));
			dialog(data.results[0].alternatives[0].transcript);
		}
	});
}

function dialog(text) {
	if (String(text).indexOf('���n') > -1)
		speak('�ڦn���L������');
	else if (String(text).indexOf('�n') > -1)
		speak('�A�n��, �ڬO7688');
	else if (String(text).indexOf('��') > -1)
		speak('�j�a�n�A�ڥs7688�A�ڨӦ�CAVEDU�A�ڷ|���A��ѡA�ٷ|�����ܸ�ۺq�A�Цh����');
	else if (String(text).indexOf('�w') > -1)
		speak('�w�w��');
	else if (String(text).indexOf('�W') > -1)
		speak('�ڥs7688');
	else if (String(text).indexOf('��') > -1)
		speak('���@�ӤH�W�r�s�p��M�ᥦ�N�Q�ݨ��F');
	else if (String(text).indexOf('��') > -1)
		speak('�ڰڰڰڰڰڰڰڰڰ�');
	else if (String(text).indexOf('�v') > -1)
		speak('�ڦn���L������');
	else 
		speak('�i�H�A���@����');
	console.log(text);
}

listen();

