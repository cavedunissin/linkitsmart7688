#include <Servo.h>  
Servo s;                    

void setup()
{
    Serial1.begin(57600);      
    s.attach(3);                      
}

void loop()
{
    if(Serial1.available())               
    {
        int command = Serial1.read(); 
        if(command == 'o')                 
            s.write(150);                       
        else if(command == 'c')          
            s.write(30);
    }
}

