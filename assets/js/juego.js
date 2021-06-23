/* // -------Nota-----
 *2C = Two of Clubs
 *2D = Two of Diaminds
 *2H = Two of Hearts
 *2S = Two of Spades */

//Patrón Modulo

(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    //Referencias del HTML

    const btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

    const obtenerCarta = document.querySelector('#jugadorCarta'),
        obtenerCartaComputadora = document.querySelector('#computadoraCarta'),
        puntosHtml = document.querySelectorAll('small');

    //Esta función inicializa el juego

    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }

    //Esta funcion me permite crear una baraja de cartas

    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let especial of especiales) {
            for (let tipo of tipos) {
                deck.push(especial + tipo);
            }
        }
        return _.shuffle(deck);
    }

    //Esta funcion me permite tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        return isNaN(valor) ?
            ((valor === 'A') ? 11 : 10) :
            (valor * 1);
    }

    //Esta fumción acumula los puntos de los jugadores

    const acumularPuntos = () => {

    }

    //Turno Computadora

    const turnoComputadora = (puntosMinimosJugador) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;

            const nuevaCarta = document.createElement('img');
            nuevaCarta.src = `./assets/cartas/${carta}.png`;
            nuevaCarta.classList.add('carta');
            obtenerCartaComputadora.append(nuevaCarta);

            if (puntosMinimosJugador > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimosJugador) && (puntosMinimosJugador <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimosJugador) {
                alert('¡Empate! Casi ganas, sigue intentandolo!');
            } else if (puntosMinimosJugador > 21) {
                alert('¡Has perdido! No te rindas a la siguiente ganas!');
            } else if (puntosComputadora > 21) {
                alert('¡Genial! Has ganado, Felicidades!');
            } else {
                alert('¡Has perdido! No te rindas a la siguiente ganas!')
            }
        }, 100);
    }

    // Eventos button Pedir y Turno Jugador

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;

        const nuevaCarta = document.createElement('img');
        // src="./assets/cartas/10C.png"
        nuevaCarta.src = `./assets/cartas/${carta}.png`;
        nuevaCarta.classList.add('carta');
        obtenerCarta.append(nuevaCarta);

        if (puntosJugador > 21) {
            console.warn('Vaya perdiste, intentalo de nuevo');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('¡Felicidades has ganado!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    })

    // Evento button Detener

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    })

    // Evento button Nuevo

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        obtenerCarta.innerHTML = '';
        obtenerCartaComputadora.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;


    })

})();