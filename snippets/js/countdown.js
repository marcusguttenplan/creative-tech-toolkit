var targetDate = new Date("Oct 15, 2019 00:00:01").getTime();

// Default counter vals to prevent content moving
document.getElementById("days").innerHTML = '00';
document.getElementById("hours").innerHTML = '00';
document.getElementById("minutes").innerHTML = '00';
document.getElementById("seconds").innerHTML = '00';

var x = setInterval(function() {

    // Date Globals
    var now = new Date().getTime();
    var delta = targetDate - now;

    // Date Math
    var d = Math.floor(delta / (1000 * 60 * 60 * 24));
    var h = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var m = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    var s = Math.floor((delta % (1000 * 60)) / 1000);

    // Init
    document.getElementById("days").innerHTML = d.toLocaleString(undefined, {minimumIntegerDigits: 2});
    document.getElementById("hours").innerHTML = h.toLocaleString(undefined, {minimumIntegerDigits: 2});
    document.getElementById("minutes").innerHTML = m.toLocaleString(undefined, {minimumIntegerDigits: 2});
    document.getElementById("seconds").innerHTML = s.toLocaleString(undefined, {minimumIntegerDigits: 2});

    if (delta < 0) {
        clearInterval(x);
        document.getElementById("counter").innerHTML = "TIME UP";
        document.getElementById("days").innerHTML = '0';
        document.getElementById("hours").innerHTML = '0';
        document.getElementById("minutes").innerHTML = '0';
        document.getElementById("seconds").innerHTML = '0';
    }
}, 1000);
