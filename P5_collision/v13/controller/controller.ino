const int upPin = 6;
const int downPin = 8;
const int leftPin = 7;
const int rightPin = 9;

int upState = 0;
int downState = 0;
int leftState = 0;
int rightState = 0;


String upStr = "0";
String downStr = "0";
String leftStr = "0";
String rightStr = "0";
String myStr = "0";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(upPin, OUTPUT);
  pinMode(downPin, OUTPUT);
  pinMode(leftPin, OUTPUT);
  pinMode(rightPin, OUTPUT);
  
  
}

void loop() {
  // put your main code here, to run repeatedly:
  upState = digitalRead(upPin);
  downState = digitalRead(downPin);
  leftState = digitalRead(leftPin);
  rightState = digitalRead(rightPin);

  if(upState == HIGH){
    upStr = String(upState);
  } else if (upState == LOW){
      upStr = String(upState);
  } 
  
  if (downState == HIGH){
      downStr = String(downState);
      
  } else if (downState == LOW){
      downStr = String(downState);
  }
  
  if (leftState == HIGH){
      leftStr = String(leftState);
      
  } else if (leftState == LOW){
      leftStr = String(leftState);
  }
  
  if (rightState == HIGH){
      rightStr = String(rightState);
      
  } else if (rightState == LOW){
      rightStr = String(rightState);
  }
  
  myStr = upStr+","+downStr+","+leftStr+","+rightStr;
  Serial.println(myStr);
  
//  Serial.print(upState);
//  Serial.print(',');
//  Serial.print(downState);
//  Serial.print(',');
//  Serial.print(leftState);
//  Serial.print(',');
//  Serial.print(rightState);
}
