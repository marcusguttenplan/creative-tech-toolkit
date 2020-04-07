// Check for full match of two arrays
function isTrue(a, b) {
    return a.every(element => b.indexOf(element) > -1);
}

var bool = isTrue(answers, prodArr[i].answers)


// Check for partial match of two arrays
function isPartTrue(a, b) {
    var matches = a.filter(element => b.includes(element))

    if (matches.length >= a.length / 2) {
        console.log(matches)
        return true;
    }
}

var bool = isPartTrue(answers, prodArr[i].answers);
