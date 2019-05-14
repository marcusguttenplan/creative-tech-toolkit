var counter = 0;
var refreshRate = 10;
var isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
};

var onMouseEnterHandler = function(event) {
    update(event);
};

var onMouseLeaveHandler = function() {
    inner.style = "";
};

var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
        update(event);
    }
};

var update = function(event) {
    console.log(event);
};
