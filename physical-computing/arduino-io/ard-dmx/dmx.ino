#include <Conceptinetics.h>
#include <Rdm_Defines.h>
#include <Rdm_Uid.h>

DMX_Master dmx_master ( 1 , 2 );


void setup()
{
    dmx_master.enable ();
    pinMode(8, INPUT);
}

void loop(){
  if(digitalRead(8))
    run();
}

void run() {
  dmx_master.setChannelRange ( 1, 1, 255 );
  dmx_master.setChannelValue ( 1, 200 );
  delay(1000);
  dmx_master.setChannelValue (1, 0);
  delay(1000);
}
