import requests 

device_id = "�ж�J�z��ID"
device_key = "�ж�J�z��KEY"

url = "http://api.mediatek.com/mcs/v2/devices/" + device_id
url = "/datachannels/" + data_channel + "/datapoints.csv"

def game_pad():
    r = requests.get(url, headers = {"deviceKey" : device_key})
    
    data = r.content.split(',')[2:]
    print data
    return (data[0][0], data[0][-1])

while True:
    command = game_pad() 
    print command
   
    if command[1] == "1":
        if command[0] == "l":
            print "press left"
        elif command[0] == "r":
            print "press right"
        elif command[0] == "u":
            print "press up"
        elif command[0] == "d":
            print "press down"
        elif command[0] == "A":
            print "press A"
        elif command[0] == "B"
            print "press B"
