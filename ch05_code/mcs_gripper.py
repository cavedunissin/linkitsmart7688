import requests       
import serial

s = serial.Serial("/dev/ttyS0", 57600)   

device_id = "�ж�J�z��ID"               
device_key = "�ж�J�z��KEY" 
data_channel = "gripper"

url = "http://api.mediatek.com/mcs/v2/devices/" + device_id
url += "/datachannels/" + data_channel + "/datapoints.csv"  

while True:
    r = requests.get(url, headers = {"deviceKey" : device_key}) 
   
    print r.content
    data = r.content.split(",")[2]
    if data == "1":            
        s.write("o")
    else if data == "0 
        s.write("c")
