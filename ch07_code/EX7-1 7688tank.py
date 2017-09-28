import BaseHTTPServer
import struct, fcntl, os
import mraa
from time import sleep

motor_R_A = mraa.Pwm(18)
motor_R_B = mraa.Pwm(19)
motor_L_A = mraa.Pwm(20)
motor_L_B = mraa.Pwm(21)

motor_R_A.period_ms(2)
motor_R_B.period_ms(2)
motor_L_A.period_ms(2)
motor_L_B.period_ms(2)

motor_R_A.enable(True)
motor_R_B.enable(True)
motor_L_A.enable(True)
motor_L_B.enable(True)

motor_R_A.write(0)
motor_R_B.write(0)
motor_L_A.write(0)
motor_L_B.write(0)

gain = 25.0

def catch(receivedata):
        button = 0;
        angle = 0;
        num = 0;
        try:
                num = receivedata.find(',')
                pass
        except:
                return

        button = int(receivedata[0:num])
        try:
                angle = int(receivedata[num+1:len(receivedata)])
                pass
        except:
                return
        L_control = 0
        R_control = 0
        #����V���ɱסA�ھ�gain�ȭp�⥪��T��
        if angle>=0:
                L_control = (100-angle*gain)/100
                R_control = 1
        #����V�k�ɱסA�ھ�gain�ȭp��k��T��
        elif angle<0:
                L_control = 1
                R_control = (100+angle*gain)/100
        #�������s���W�U��
        if L_control < 0:
                L_control = 0
        elif L_control > 1:
                L_control = 1
        elif R_control < 0:
                R_control = 0
        elif R_control > 1:
                R_control = 1
        print L_control
        print R_control

        if button == 0:  #�����H����
                motor_R_A.write(0)
                motor_R_B.write(0)
                motor_L_A.write(0)
                motor_L_B.write(0)
       #�����H��h�]�ھ�L_control�PR_control�ȨӨM�w��������A�k����Ϋ�h�^
        if button == 2:  
                motor_R_A.write(L_control)
                motor_R_B.write(0)
                motor_L_A.write(R_control)
                motor_L_B.write(0)
        #�����H�e�i�]�ھ�L_control�PR_control�ȨӨM�w������A�k��Ϋe�i�^
        if button == 1:
                motor_R_B.write(L_control)
                motor_R_A.write(0)
                motor_L_B.write(R_control)
        try:
                num = receivedata.find(',')
                pass
        except:
                return

        button = int(receivedata[0:num])
        try:
                angle = int(receivedata[num+1:len(receivedata)])
                pass
        except:
                return
        L_control = 0
        R_control = 0
        #����V���ɱסA�ھ�gain�ȭp�⥪��T��
        if angle>=0:
                L_control = (100-angle*gain)/100
                R_control = 1
        #����V�k�ɱסA�ھ�gain�ȭp��k��T��
        elif angle<0:
                L_control = 1
                R_control = (100+angle*gain)/100
        #�������s���W�U��
        if L_control < 0:
                L_control = 0
        elif L_control > 1:
                L_control = 1
        elif R_control < 0:
                R_control = 0
        elif R_control > 1:
                R_control = 1
        print L_control
        print R_control

        if button == 0:  #�����H����
                motor_R_A.write(0)
                motor_R_B.write(0)
                motor_L_A.write(0)
                motor_L_B.write(0)
       #�����H��h�]�ھ�L_control�PR_control�ȨӨM�w��������A�k����Ϋ�h�^
        if button == 2:  
                motor_R_A.write(L_control)
                motor_R_B.write(0)
                motor_L_A.write(R_control)
                motor_L_B.write(0)
        #�����H�e�i�]�ھ�L_control�PR_control�ȨӨM�w������A�k��Ϋe�i�^
        if button == 1:
                motor_R_B.write(L_control)
                motor_R_A.write(0)
                motor_L_B.write(R_control)
                motor_L_A.write(0)
        pass
"""��������HTTP���A���B�z�A�w��}�Ҧ��A����o�X200�^���A�åB�Y������GET��POST��HTTP�T�����۹������^��"""
class ServerHandler(BaseHTTPServer.BaseHTTPRequestHandler):
        def do_HEAD(self):
                self.send_response(200)
                self.send_header("Connection","Close")
                self.end_headers()
        def do_GET(self):
                print ("======= GET STARTED =======")
                print (self.headers)

        def do_POST(self):
                self.send_response(200)
                self.send_header("Connection","Close")
                self.end_headers()
                print ("======= POST STARTED =======")
                print (self.headers)
                print ("======= POST VALUES =======")
                length = int(self.headers['content-length'])
                item = self.rfile.read(length)
                print(item)
                catch(item)
#�}�Ҥ@�Ӱ��HTTP���A�����������A��
class WebServer(BaseHTTPServer.HTTPServer):
        def __init__(self, *args, **kwargs):
                BaseHTTPServer.HTTPServer.__init__(self, *args, **kwargs)
                flags = fcntl.fcntl(self.socket.fileno(), fcntl.F_GETFD)
                flags |= fcntl.FD_CLOEXEC
                fcntl.fcntl(self.socket.fileno(), fcntl.F_SETFD, flags)
server_class = WebServer

httpd = server_class(("", 29876), ServerHandler)  #���w�s�u��
httpd.serve_forever()
