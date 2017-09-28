from pyfirmata import Arduino, util  
import requests
board=Arduino('/dev/ttyS0') 
EN1=board.get_pin('d:3:p')
IN1=board.digital[2]
IN2=board.digital[4]
EN2=board.get_pin('d:5:p')
IN3=board.digital[6]
IN4=board.digital[7]
device_id = "Input device_id"
device_key = "Input device_key"
data_channel = "gamepad"
url = "http://api.mediatek.com/mcs/v2/devices/" + device_id 
url += "/datachannels/" + data_channel + "/datapoints.csv"
def game_pad():
    r = requests.get(url, headers = {"deviceKey" : device_key})
    data = r.content.split(',')[2:]
    print data
    return (data[0][0], data[0][-1])
while True:
    command = game_pad()
    if command[1] == "l":       //����Ʀr��1�N����s�Q���U
        if command[0] == "1":   //����p�g��l
            print "left"
            EN1.write(1);
            IN1.write(0);
            IN2.write(1);
            EN2.write(1);
            IN3.write(1);
            IN4.write(0);
�K�K
else:   // command[1]���O����1�N�O0
        led.write(0);
            EN1.write(0);
            IN1.write(0);
            IN2.write(0);
            EN2.write(0);
            IN3.write(0);
            IN4.write(0);
