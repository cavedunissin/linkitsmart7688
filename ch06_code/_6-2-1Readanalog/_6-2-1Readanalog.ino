#define sensorPin A0
void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
}
void loop() {
  int Sensor = analogRead(sensorPin);
  Serial.println(Sensor);
  Serial1.print('a');
  Serial1.print(String(Sensor).length());
  Serial1.print(Sensor);
  delay(1000);
}

