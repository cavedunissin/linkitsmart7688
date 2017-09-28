#include <Servo.h>   

Servo servo_gripper;   
Servo servo_base;
Servo servo_updown;
Servo servo_frontback;

int degree_base         = 180;           
int degree_updown    = 90;
int degree_frontback  = 90;

void setup()
{
    Serial.begin(115200);             
    Serial1.begin(57600);             

    servo_gripper.attach(3); 
    servo_updown.attach(5); 
    servo_frontback.attach(6);        
    servo_base.attach(9); 
}

void loop()
{
    if(Serial1.available())
    {
        int command = Serial1.read();
        if(command == 'o')            
        {
            Serial.println("gripper open");
            servo_gripper.write(160); 
        }
        else if(command == 'c') 
        {
            Serial.println("gripper closed");
            servo_gripper.write(30); 
        }
        else if(command == 'u') 
        {
            degree_updown = (++degree_updown > 180) ? 180 : degree_updown;
            Serial.print("degree_updown");  
            Serial.println(degree_updown);
            servo_updown.write(degree_updown); 
        }
        else if(command == 'd')       
        {
            degree_updown = (--degree_updown < 0) ? 0 : degree_updown;
            Serial.print("degree_updown");
            Serial.println(degree_updown);
            servo_updown.write(degree_updown); 
        }
        else if(command == 'a') 
        {
            degree_frontback = (++degree_frontback > 180) ? 180 : degree_frontback; 
            Serial.print("degree_frontback: ");
            Serial.println(degree_frontback);    
            servo_frontback.write(degree_frontback); 
        }
        else if(command == 'b')       
        {
            degree_frontback = (--degree_frontback < 0) ? 0 : degree_frontback;
            Serial.print("degree_frontback: ");
            Serial.println(degree_frontback);
            servo_frontback.write(degree_frontback); 
        }
        else if(command == 'l') 
        {
            degree_base = (++degree_base > 180) ? 180 : degree_base;
            Serial.print("degree_base: ");
            Serial.println(degree_base);
            servo_base.write(degree_base); 
        }
        else if(command == 'r') 
        {
            degree_base = (--degree_base < 0) ? 0 : degree_base;
            Serial.print("degree_base: ");
            Serial.println(degree_base);
            servo_base.write(degree_base); 
        }
    }
}

