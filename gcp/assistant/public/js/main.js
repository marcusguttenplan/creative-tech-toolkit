'use strict';

interactiveCanvas.ready({
    onUpdate(data) {
        if (data.scene === 'score') {
            var player_1 = document.querySelector('#player-1');
            var player_2 = document.querySelector('#player-2');

            player_1.innerHTML = data.score.player_1;
            player_2.innerHTML = data.score.player_2
        }
    }
});
