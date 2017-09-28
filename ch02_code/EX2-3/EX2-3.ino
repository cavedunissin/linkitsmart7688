void setup() {
  Serial.begin(9600);   //初始化Serial通訊為每秒9600bits

}
// 迴圈函數會一遍又一遍的執行
void loop() { 
  int sensorValue = analogRead(A0);   //讀取A0腳位的輸入值
  Serial.println(sensorValue);   //列印讀取的數值
  delay(1);   // 為了維持穩定性，每一次讀取之間的延遲時間
}

