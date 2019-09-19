// Solenoid Pins
int solenoid1 = 8;
int solenoid2 = 7;
int solenoid3 = 4;

// Button Pins
int button1 = A0;
int button2 = A1;

// Button State
int button1state = 0;
int button1laststate = 0;
int button2state = 0;
int button2laststate = 0;

// Motor Pins
const int stepPin = 2;
const int dirPin = 3;
const int dir = 0;

// Motor Angles
const int deg90 = 50;
const int deg180 = 100;
const int deg270 = 150;
const int deg360 = 200;

// Furnace Pins
const int gas = 12;
const int spark = 13;

void setup() {
        Serial.begin(9600);

        // Solenoid Init
        pinMode(solenoid1, OUTPUT);
        pinMode(solenoid2, OUTPUT);
        pinMode(solenoid3, OUTPUT);

        // Button Init
        pinMode(button1, INPUT);
        pinMode(button2, INPUT);

        // Motor Init
        pinMode(stepPin, OUTPUT);
        pinMode(dirPin, OUTPUT);

        // Furnace Init
        pinMode(gas, OUTPUT);
        pinMode(spark, OUTPUT);
}

void loop() {

        button1state = digitalRead(button1);
        button2state = digitalRead(button2);

        // YELLOW BUTTON
        if (button1state != button1laststate) {
                Serial.println("HIGH 1");

                unload(dir);

        }


        // RED BUTTON
        if (button2state != button2laststate) {
                Serial.println("HIGH 2");
                overunder(dir);

        }

        button1laststate = button1state;
        button2laststate = button2state;


}


// Turn Gas On
void furnace() {
        digitalWrite(gas, HIGH);
        delay(750);
        digitalWrite(spark, HIGH);
}

void sparkStop() {
        digitalWrite(spark, LOW);
}

void furnaceStop() {
        digitalWrite(gas, LOW);
}

void unload(int dir) {

        // Choose whether to turn motor L or R
        if (dir == 0) {
                digitalWrite(dirPin, HIGH);
        } else {
                dir = 1;
                digitalWrite(dirPin, LOW);
        }


        // UNLOAD ROLL
        Serial.println("TURN FOR UNLOAD");
        for(int x = 0; x < 100; x++) {
                digitalWrite(stepPin, HIGH);
                delayMicroseconds(500);
                digitalWrite(stepPin, LOW);
                delayMicroseconds(500);
        }

        // OPEN LOCK
        Serial.println("OPEN LOCK");
        delay(500);
        digitalWrite(solenoid2, HIGH);
        delay(500);
        digitalWrite(solenoid3, HIGH);
        digitalWrite(solenoid2, LOW);

        // START FURNACE
        Serial.println("START FURNACE");
        furnace();
        delay(1500);
        sparkStop();
        delay(10000);   // Wait 10s Before Stopping Furnace
        furnaceStop();

        // RELOAD
        Serial.println("TURN FOR RELOAD");
        for(int x = 0; x < 200; x++) {
                digitalWrite(stepPin, HIGH);
                delayMicroseconds(500);
                digitalWrite(stepPin, LOW);
                delayMicroseconds(500);
        }

        delay(500);
        digitalWrite(solenoid3, LOW);

        // LOAD ROLL
        Serial.println("RELOAD");
        delayMicroseconds(500);
        digitalWrite(solenoid1, HIGH);
        delayMicroseconds(500);
        digitalWrite(solenoid1, LOW);

        // CLOSE LOCK
        Serial.println("CLOSE LOCK");
        delay(500);
        digitalWrite(solenoid2, LOW);
        delay(500);
        digitalWrite(solenoid1, HIGH);

        // RETURN HOME
        Serial.println("RETURN HOME");
        for(int x = 0; x < 50; x++) {
                digitalWrite(stepPin, HIGH);
                delayMicroseconds(500);
                digitalWrite(stepPin, LOW);
                delayMicroseconds(500);
        }
}


// Switch Between Over/Under
void overunder(int dir) {
        if (dir == 0) {
                digitalWrite(dirPin, HIGH);
        } else {
                dir = 1;
                digitalWrite(dirPin, LOW);
        }

        for(int x = 0; x < 100; x++) {
                digitalWrite(stepPin, HIGH);
                delayMicroseconds(500);
                digitalWrite(stepPin, LOW);
                delayMicroseconds(500);
        }
}
