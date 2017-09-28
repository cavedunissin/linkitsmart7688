data_channel = "sensor"
data_channel +=",,"
url = "http://api.mediatek.com/mcs/v2/devices/" + device_id
url += "/datapoints.csv"
def MCS_upload(value,length):
        data = data_channel+str(value)
        r = requests.post(url,headers = {"deviceKey" : 
¡@¡@¡@¡@¡@¡@device_key,'Content-Type':'text/csv'},data=data)
        print r.text
while True:
        if ser.read()=='a':
                IncommingNum = ser.read()
                sensor = int(ser.read(int(IncommingNum)))

                a = 8
                a += int(IncommingNum)

                MCS_upload(sensor,a)
