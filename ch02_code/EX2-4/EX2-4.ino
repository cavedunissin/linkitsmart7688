void setup() {
  Serial.begin(9600);   //初始化Serial通訊為每秒9600bits
}
 
void loop() {
  float sensor_volt; 
  float RS_air;    //以乾淨空氣為基準，讀取RS的資料
  float R0;  // 讀取在H2中的R0資料
  float sensorValue;
 
/*得到一百次取樣的平均數值*/   
    for(int x = 0 ; x < 100 ; x++)
  {
    sensorValue = sensorValue + analogRead(A0);
  }
  sensorValue = sensorValue/100.0;
/*-----------------------------------------------*/
 
  sensor_volt = sensorValue/1024*5.0;
  RS_air = (5.0-sensor_volt)/sensor_volt; // omit *RL
  R0 = RS_air/6.5;    // RS與R0的比例請參考
 
  Serial.print("sensor_volt = ");
  Serial.print(sensor_volt);
  Serial.println("V");
 
  Serial.print("R0 = ");
  Serial.println(R0);
  delay(1000);
 
}

