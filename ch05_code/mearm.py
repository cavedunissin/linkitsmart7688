import requests
import serial

s = serial.Serial("/dev/ttyS0", 57600) 

device_id = "請填入你的ID"          
device_key = "請填入的KEY" 
data_channel = "gamepad"        
data_channel2 = "gripper"       

url = "http://api.mediatek.com/mcs/v2/devices/" + device_id
url += "/datachannels/" + data_channel + "/datapoints.csv"

url2 = "http://api.mediatek.com/mcs/v2/devices/" + device_id
url2 += "/datachannels/" + data_channel2 + "/datapoints.csv"


def game_pad():
    r = requests.get(url, headers = {"deviceKey" : device_key})
    data = r.content.split(',')[2:]
    return (data[0][0], data[0][-1])

def gripper():
    r = requests.get(url2, headers = {"deviceKey" : device_key})
    return r.content[-1]

while True: 
    command = game_pad()
    command2 = gripper()
    if command[1] == "1":
        if command[0] == "l":
            print "press left"
            s.write("l")
        elif command[0] == "r":
            print "press right"
            s.write("r")
        elif command[0] == "u":
            print "press up"
            s.write("u")
        elif command[0] == "d":
            print "press down"
            s.write("d")
        elif command[0] == "A":
            print "press A"
            s.write("a")
        elif command[0] == "B":
            print "press B"
            s.write("b")
    if command2 == "1":
        print "closed"
        s.write("c")
    elif command2 == "0":
        print "open"
        s.write("o")
