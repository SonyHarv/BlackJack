/* // -------Nota-----
 *2C = Two of Clubs
 *2D = Two of Diaminds
 *2H = Two of Hearts
 *2S = Two of Spades */

//Patrón Modulo

const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  //Referencias del HTML

  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener");

  const obtenerCartasJugadores = document.querySelectorAll(".barajas-content"),
    puntosHtml = document.querySelectorAll("small");

  //Esta función inicializa el juego

  const iniciarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    puntosHtml.forEach((element) => (element.innerText = 0));
    obtenerCartasJugadores.forEach((element) => (element.innerHTML = ""));
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  //Esta funcion me permite crear una baraja de cartas

  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }
    return _.shuffle(deck);
  };

  //Esta funcion me permite tomar una carta

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  //Esta fumción acumula los puntos de los jugadores donde: Turno:0=primer jugador y el ultimo siempre es la computadora.

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  //crear cartas

  const crearCarta = (carta, turno) => {
    const nuevaCarta = document.createElement("img");
    nuevaCarta.src = `./assets/cartas/${carta}.png`;
    nuevaCarta.classList.add("carta");
    obtenerCartasJugadores[turno].append(nuevaCarta);
  };

  ///determinar ganador

  const determinarJugador = () => {
    const [puntosMinimosJugador, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if (puntosComputadora === puntosMinimosJugador) {
        alert("¡Empate! Casi ganas, sigue intentandolo!");
      } else if (puntosMinimosJugador > 21) {
        alert("¡Has perdido! No te rindas a la siguiente ganas!");
      } else if (puntosComputadora > 21) {
        alert("¡Genial! Has ganado, Felicidades!");
      } else {
        alert("¡Has perdido! No te rindas a la siguiente ganas!");
      }
    }, 500);
  };

  //Turno Computadora

  const turnoComputadora = (puntosMinimosJugador) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimosJugador > 21) {
        break;
      }
    } while (
      puntosComputadora < puntosMinimosJugador &&
      puntosMinimosJugador <= 21
    );

    determinarJugador();
  };

  // Eventos button Pedir y Turno Jugador

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Vaya perdiste, intentalo de nuevo");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("¡Felicidades has ganado!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  // Evento button Detener

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  // Evento button Nuevo

  btnNuevo.addEventListener("click", () => {
    console.clear();
    iniciarJuego();
  });

  return {
    nuevoJuego: iniciarJuego,
  };
})();
