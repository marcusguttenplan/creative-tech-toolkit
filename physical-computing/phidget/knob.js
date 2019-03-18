var increaseInterval;
var decreaseInterval;

// Phidget Connect
var conn = new phidget22.Connection(8989, 'localhost');
conn.connect().then(function(){
  console.log("phidget connected");
}).catch(function(err){
  conn.delete();
  alert('failed to connect to server:' + err);
});

// Phidget Interface
var man = new phidget22.Manager({
  onDeviceAttach: function(dev) {
    console.log("device attached");

    // One Digital Input
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

    // One Phidget Rotary Encoder
    var encoder = new phidget22.Encoder();
    encoder.open().then(function(){
      encoder.setDataInterval(20);
      encoder.setPositionChangeTrigger(1);

      // code to execture after open succeeds
      encoder.onPositionChange = function(positionChange, timeChange, indexTriggered) {
        tickValue = encoder.getPosition();
        console.log("tick value:" + tickValue);

        // I flipped these 2 if statements becuase encoder was installed backwards
        if(tickValue <= 1){
          // increase
          clearInterval(increaseInterval);
          clearInterval(decreaseInterval);
          increaseInterval = setInterval(function(){
            console.log("increasing");
          }, 1000);
        }else if (tickValue >= 5) {
          // decrease
          clearInterval(increaseInterval);
          clearInterval(decreaseInterval);
          decreaseInterval = setInterval(function(){
              console.log("decreasing");
          }, 1000);
        }else{
          // no change
          clearInterval(increaseInterval);
          clearInterval(decreaseInterval);
        }
      }
    });

    // Second Digital Input
    var ch2 = new phidget22.DigitalInput();
    ch2.setChannel(1);
    ch2.open().then(function(){
      ch2.onStateChange = function() {
        var state = ch2.getState();
        if(state == 1){
          console.log("state == 1");
        };
      };
    }).catch(function(err){
      console.log("phidget open failed: " + err);
    });

  },
  onDeviceDetach: function(dev) {
    console.log("device removed");
  }
});

man.open();
