/* // -------Nota-----
 *2C = Two of Clubs
 *2D = Two of Diaminds
 *2H = Two of Hearts
 *2S = Two of Spades */

let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const obtenerCarta = document.querySelector('#jugadorCarta');
const obtenerCartaComputadora = document.querySelector('#computadoraCarta');
const puntosHtml = document.querySelectorAll('small');

//Esta funcion me permite crear una baraja de cartas

const crearDeck = () => {
    for (i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let especial of especiales) {
        for (let tipo of tipos) {
            deck.push(especial + tipo);
        }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return isNaN(valor) ?
        ((valor === 'A') ? 11 : 10) :
        (valor * 1);

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

}

// Eventos y Turno Jugador

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
        // alert('Vaya perdiste, intentalo de nuevo');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('¡Felicidades has ganado!');
        // alert('¡Felicidades has ganado!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

})

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);

})