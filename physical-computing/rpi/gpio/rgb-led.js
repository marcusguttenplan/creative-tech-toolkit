var five = require("johnny-five");

console.log("STARTING RASPI");
console.log("WATCHING GPIO");
console.log("ON");

var dataObj = {
    r: 0.255,
    g: 0.165,
    b: 0
}

function watcher(data) {
    console.log("watcher function started");

    var r = data.r;
    var g = data.g;
    var b = data.b;

    console.log(r, g, b);

    five.Board().on("ready", function() {
        console.log("johnny-five started");

        // Initialize the RGB LED
        var led = new five.Led.RGB({
            pins: {
                red: 6,
                green: 5,
                blue: 3
            },
            isAnode: true
        });

        // Add led to REPL (optional)
        this.repl.inject({
            led: led
        });

        // Turn it on and set the initial color
        led.on();
        led.color("#e02323");

        led.blink(1000);

    });
}

watcher(dataObj);

function stop() {}
