const gpio = require('onoff').Gpio;
const ledR = new gpio(23, 'out');
const ledB = new gpio(18, 'out');
const button = new gpio(4, 'in', 'both');

console.log("STARTING RASPI");
console.log("WATCHING GPIO");

button.watch((err, value) => {
    if (err) {
        throw err;
    }
    console.log(value);
    ledR.writeSync(value);
});
