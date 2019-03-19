var phidget22 = require('phidget22');

var conn = new phidget22.Connection(5661, 'localhost');

conn.onConnect(function(d){
    console.log("onConnect", d);
})
conn.connect().then(function(){
  console.log("phidget connected");
}).catch(function(err){
  conn.delete();
  alert('failed to connect to server:' + err);
});


//// Phidget Interface
var man = new phidget22.Manager({
  onDeviceAttach: function(dev) {
    console.log("device attached");

    var ch1 = new phidget22.DigitalInput(0);
    ch1.open().then(function(){
      ch1.onStateChange = function() {
        console.log("state changed");
        var state = ch1.getState();
        if(state == 1){
            console.log("state == 1");
        }else{
            console.log("state != 1");
        }
      }
    }).catch(function(err){
      console.log("phidget open failed: " + err);
    });

    var encoder = new phidget22.Encoder();
    encoder.open().then(function(){
      var initTick = 0;
      encoder.onPositionChange = function(positionChange, timeChange, indexTriggered) {
        tickValue = encoder.getIndexPosition();
        console.log("tick value:" + tickValue);

        if (tickValue === 0) {
            initTick += (tickValue + 1);
        } else {
            initTick += tickValue;
        }

        console.log(initTick);
      }
    });
  },
  onDeviceDetach: function(dev) {
    console.log("device removed");
  }
});

man.open();
