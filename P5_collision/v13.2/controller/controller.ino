const int upPin = 10;
const int downPin = 9;
const int leftPin = 8;
const int rightPin = 11;
const int postPin = 12;

int upState = 0;
int downState = 0;
int leftState = 0;
int rightState = 0;
int postState;
int lastPostState = LOW;

long lastDebounceTime = 0;
long debounceDelay = 200;

String upStr = "0";
String downStr = "0";
String leftStr = "0";
String rightStr = "0";
String postStr = "0";
String myStr = "0";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(upPin, OUTPUT);
  pinMode(downPin, OUTPUT);
  pinMode(leftPin, OUTPUT);
  pinMode(rightPin, OUTPUT);
  pinMode(postPin, OUTPUT);
  
  
}

void loop() {
  // put your main code here, to run repeatedly:

  //BUTTON
  upState = digitalRead(upPin);
  downState = digitalRead(downPin);
  leftState = digitalRead(leftPin);
  rightState = digitalRead(rightPin);

  int reading = digitalRead(postPin);
  if (reading != lastPostState){
    lastDebounceTime = millis();
  }
  if((millis() - lastDebounceTime) > debounceDelay) {
    if(reading != postState){
      postState = reading;

      if(postState == HIGH){
        postStr = "1";
      } else { postStr = "0"; }
    }
  }
  lastPostState = reading;


  //JOYSTICK
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

  
  myStr = upStr+","+downStr+","+leftStr+","+rightStr + "," + postStr;
  Serial.println(myStr);
  delay(100);
  
//  Serial.print(upState);
//  Serial.print(',');
//  Serial.print(downState);
//  Serial.print(',');
//  Serial.print(leftState);
//  Serial.print(',');
//  Serial.print(rightState);
}
