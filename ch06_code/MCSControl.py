import serial
import requests
ser = serial.Serial('/dev/ttyS0',9600)
device_id = "Your device ID"
device_key = "Your device key"
data_channel = "Led_Control"
url = "http://api.mediatek.com/mcs/v2/devices/" + device_id
url += "/datachannels/" + data_channel + "/datapoints.csv"
def get_data():
        r = requests.get(url,headers = {"deviceKey" : device_key})
        data = r.content.split(',')[2:]
       print data
       retrun data
while True:
        command = get_data()
        if command[0] == '1':
                ser.write('1')
        elif command[0] == '0':
                ser.write('0')
