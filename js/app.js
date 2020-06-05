var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    maxScore = document.getElementById("scoreInput").value;
    if (maxScore > 0) {
        document.getElementById("scoreInput").disabled = true;
        document.querySelector('.btn-hold').disabled = false;

        if (gamePlaying) {
            //1. Numero aleatorio en los dados
            var dice1 = Math.floor((Math.random() * 6)) + 1;
            var dice2 = Math.floor((Math.random() * 6)) + 1;

            //2. Mostrar el resultado
            var diceDOM1 = document.getElementById('dice-1');
            var diceDOM2 = document.getElementById('dice-2');

            diceDOM1.style.display = 'block';
            diceDOM1.src = 'images/dice-' + dice1 + '.png';

            diceDOM2.style.display = 'block';
            diceDOM2.src = 'images/dice-' + dice2 + '.png';

            //3. Actualizar el puuntaje en caso de no ser 1
            if (dice1 !== 1 && dice2 !== 1) {
                // Agrega puntaje actual
                roundScore += (dice1 + dice2);
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
            else {
                // Siguiente jugador
                nextPlayer();
            }
        }
    }
    else {
        alert('Debe ingresar un valor');
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // Agregar el puntaje al final
        scores[activePlayer] += roundScore;
        // Actualizar UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Ver si el jugador gano
        if (scores[activePlayer] >= maxScore) {
            document.getElementById('name-' + activePlayer).textContent = 'GANADOR!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            // Siguiente jugador
            nextPlayer();
        }
    }
})

document.querySelector('.inputMaxScore').addEventListener('keypress', function (evt) {
    var theEvent = evt || window.event;


    // Manejo de pegado
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Manejo del presionado de teclas
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
})

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayer() {
    // Siguiente jugador
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Jugador 1';
    document.getElementById('name-1').textContent = 'Jugador 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.btn-hold').disabled = true;
    document.getElementById("scoreInput").disabled = false;
    document.getElementById("scoreInput").textContent = '';

}

