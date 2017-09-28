#include <Wire.h>
#include <SeeedOLED.h>


void setup()
{
  Wire.begin();
  SeeedOled.init();  //初始化 SeeeD OLED 顯示器
  DDRB|=0x21;        
  PORTB |= 0x21;

  SeeedOled.clearDisplay();          //清除顯示器並回到顯示器起始座標  SeeedOled.setNormalDisplay();        //設定顯示模式為一般模式  SeeedOled.setPageMode();            //設定頁面模式
  SeeedOled.setTextXY(0,0);          //設定游標的XY座標
SeeedOled.putString("Hello World!");   //列印字串

}

void loop()
{
  
}

