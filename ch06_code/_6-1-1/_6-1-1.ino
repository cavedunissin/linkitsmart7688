#define led 13
void setup()
{
   Serial.begin(9600);
   Serial1.begin(9600);
   pinMode(led, OUTPUT);
}
void loop()
{
　if (Serial1.available())
　{
    char IncomingWord = char(Serial1.read());
    switch (IncomingWord)
    {
     case '1':
       digitalWrite(led, HIGH);
       Serial.println("LED On");
       break;
     case '0':
       digitalWrite(led, LOW);
       Serial.println("LED Off");
       break;
    }
　}
}


