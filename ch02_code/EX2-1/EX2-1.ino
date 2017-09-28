void setup() {
  pinMode(13, OUTPUT);   //初始化13號腳位為輸出腳位
}

  // 迴圈函數會一遍又一遍的執行
void loop() {
  digitalWrite(13, HIGH);   // 打開LED燈 (HIGH 是高電位)
  delay(1000);            // 等待一秒
  digitalWrite(13, LOW);   // 藉由低電位關掉LED燈
  delay(1000);            // 等待一秒
}

