                         // 設定腳位號碼
const int buttonPin = 4;      // 開關的腳位號碼
const int ledPin =  13;      // LED燈的腳位號碼
                         // 會改變的變數:
int buttonState = 0;         // 讀取按鈕狀態的變數

void setup() {
  pinMode(ledPin, OUTPUT); // 初始化LED燈腳位為輸出
  pinMode(buttonPin, INPUT); // 初始化按鈕為輸入
}

void loop() {
  buttonState = digitalRead(buttonPin); //讀取按鈕狀態 
                        // 確認按鈕是否被按壓
                        // 如果是，狀態為HIGH
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);   // 開啟LED燈
  }
  else {
    digitalWrite(ledPin, LOW);   // 關閉LED燈
  }
}

