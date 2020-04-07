// var lights = [1,2,3,4,5,6,7,8,9,10];
            var lights = [1,3,4,5,7,8,10];
            var lightsCount = 10;

            function splitConsecutive(arr) {
                var start = arr[0];
                var stop = start;
                var arrLength = arr.length;
                var result = [];

                for (var i = 1; i < arrLength; i++) {
                    if (arr[i] === stop+1) {
                      stop = arr[i];
                    } else {

                        if (start === stop) {
                            result.push([start])
                        } else {
                            result.push([start, stop])
                        }
                        start = arr[i];
                        stop = start;
                    }
                }

                if (start === stop) {
                    result.push([start])

                } else {
                    result.push([start, stop])
                }
                return result
        }


        function getRange(start, end) {
          return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }



        function updateLights(lights) {
            var baseWidth = 100/lightsCount;
            var arr = splitConsecutive(lights);

            for (var i = 0; i < arr.length; i++) {
                // console.log(arr[i]);
                if (arr[i].length >= 2) {
                    var range = getRange(arr[i][0], arr[i][1]);
                    console.log(range)

                    if (range.length === 3) {
                        for (var j = 0; j < range.length; j++) {
                            console.log("range")
                            $('#lights').prepend('<div class="light light-'+range[j]+' light-lg"></div>');
                            $('.light-'+range[j]).css({width:baseWidth+10+'vw',height:baseWidth+10+'vw',left:(baseWidth-2)*range[j]+'vw'})
                        }
                    } else if (range.length === 2) {
                        for (var j = 0; j < range.length; j++) {
                            $('#lights').prepend('<div class="light light-'+range[j]+' light-md"></div>');
                            $('.light-'+range[j]).css({width:baseWidth+5+'vw',height:baseWidth+5+'vw',left:(baseWidth-2)*range[j]+'vw'})
                        }
                    }
                } else {
                    $('#lights').prepend('<div class="light light-'+arr[i][0]+' light-sm"></div>');
                    $('.light-'+arr[i][0]).css({width:baseWidth+'vw',height:baseWidth+'vw',left:(baseWidth-2)*arr[i][0]+'vw'})
                }
            }

        }

        updateLights(lights)
