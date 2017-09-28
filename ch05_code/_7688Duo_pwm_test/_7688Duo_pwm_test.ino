include <Servo.h> 
Servo s; 
void setup()
{
    s.attach(3);
}
void loop()  
{
    for(i = 30; i <= 150; i++)  
    {
        s.write(i);
        delay(20);
    }
    for(i = 150; i >= 30; i--)
   {
        s.write(i);
        delay(20);
    }
}

