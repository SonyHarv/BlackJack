const miModulo = (() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    a = ["A", "J", "Q", "K"];
  let n = [];
  const s = document.querySelector("#btnNuevo"),
    o = document.querySelector("#btnPedir"),
    l = document.querySelector("#btnDetener"),
    r = document.querySelectorAll(".barajas-content"),
    d = document.querySelectorAll("small"),
    i = (t = 2) => {
      (e = c()), (n = []);
      for (let e = 0; e < t; e++) n.push(0);
      d.forEach((e) => (e.innerText = 0)),
        r.forEach((e) => (e.innerHTML = "")),
        (o.disabled = !1),
        (l.disabled = !1);
    },
    c = () => {
      e = [];
      for (let a = 2; a <= 10; a++) for (let n of t) e.push(a + n);
      for (let n of t) for (let t of a) e.push(t + n);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw "No hay cartas en el deck";
      return e.pop();
    },
    g = (e, t) => (
      (n[t] =
        n[t] +
        ((e) => {
          const t = e.substring(0, e.length - 1);
          return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
        })(e)),
      (d[t].innerText = n[t]),
      n[t]
    ),
    b = (e, t) => {
      const a = document.createElement("img");
      (a.src = `./assets/cartas/${e}.png`),
        a.classList.add("carta"),
        r[t].append(a);
    },
    f = (e) => {
      let t = 0;
      do {
        const a = u();
        if (((t = g(a, n.length - 1)), b(a, n.length - 1), e > 21)) break;
      } while (t < e && e <= 21);
      (() => {
        const [e, t] = n;
        setTimeout(() => {
          t === e
            ? alert("¡Empate! Casi ganas, sigue intentandolo!")
            : e > 21
            ? alert("¡Has perdido! No te rindas a la siguiente ganas!")
            : t > 21
            ? alert("¡Genial! Has ganado, Felicidades!")
            : alert("¡Has perdido! No te rindas a la siguiente ganas!");
        }, 500);
      })();
    };
  return (
    o.addEventListener("click", () => {
      const e = u(),
        t = g(e, 0);
      b(e, 0),
        t > 21
          ? (console.warn("Vaya perdiste, intentalo de nuevo"),
            (o.disabled = !0),
            (l.disabled = !0),
            f(t))
          : 21 === t &&
            (console.warn("¡Felicidades has ganado!"),
            (o.disabled = !0),
            (l.disabled = !0),
            f(t));
    }),
    l.addEventListener("click", () => {
      (o.disabled = !0), (l.disabled = !0), f(n[0]);
    }),
    s.addEventListener("click", () => {
      console.clear(), i();
    }),
    { nuevoJuego: i }
  );
})();
