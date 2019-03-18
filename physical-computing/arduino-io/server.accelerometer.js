//// johnny-five setup
const five = require("johnny-five");
const board = new five.Board();

// johnny-five init
board.on("ready", function() {
    console.log("board ready");

    axl = new five.Accelerometer({
      controller: "ADXL335",
      pins: ["A1", "A2", "A3"]
    });

    axl.on("change", function() {
        // console.log("X: %d", this.x);
        // console.log("Y: %d", this.y);
        console.log("Z: %d", this.z);
    });
});
