document.addEventListener("DOMContentLoaded", (event) => {
  const selectors = {};
  const estadoDelJuego = {
    iniciado: false,
    energia: 1,
    punto: false,
  };
  selectors.titulo = document.getElementById("titulo");
  selectors.inputDificultad = document.getElementById("inputDificultad");
  selectors.btnJugar = document.getElementById("btnJugar");
  selectors.container = document.body;
  let gameLoop = null;
  const TIEMPO_APAGADO_DEFAULT = 1000;
  const TIEMPO_ENCENDIDO_DEFAULT = 4000;
  const TIEMPO_APAGADO_MINIMO = 500;

  const startGame = (e) => {
    const dificultad = parseInt(selectors.inputDificultad.value);
    if (validarDificultad(dificultad)) {
      estadoDelJuego.punto = e.target.classList.contains("btnActivo");
      if (!estadoDelJuego.iniciado) {
        estadoDelJuego.iniciado = true;
        cleanGameScene();
        setScene();
        gameLoop = play(dificultad);
      }
      analizarEstadoDelJuego();
    }
  };

  const analizarEstadoDelJuego = () => {
    if (estadoDelJuego.energia === 100) {
      selectors.titulo.innerHTML = "Llenaste toda la energía, ganaste!";
      selectors.btnJugar.classList.add("btnCargado");
      selectors.inputDificultad.style.background = `green`;

      clearInterval(gameLoop);
      resetGameScene();
    } else if (estadoDelJuego.energia <= 0) {
      selectors.titulo.innerHTML =
        "Perdiste toda la energía, volver a intentarlo!";
      selectors.btnJugar.classList.add("btnDescargado");
      clearInterval(gameLoop);
      resetGameScene();
    }
    if (estadoDelJuego.punto) {
      estadoDelJuego.energia += 10;
      updateEnergia();
      selectors.btnJugar.classList.remove("btnActivo");
      estadoDelJuego.punto = false;
    } else {
      estadoDelJuego.energia -= 10;
      updateEnergia();
    }
  };
  const validarDificultad = (dificultad) => {
    if ((dificultad > 10) | (dificultad <= 0) | isNaN(dificultad)) {
      selectors.titulo.innerHTML =
        "La dificultad debe ser un numero entre 1 y 10.";
      selectors.titulo.style.color = "red";
      setTimeout(() => {
        selectors.titulo.innerHTML =
          "Del 1 al 10, que tanto te gustan los desafíos?";
        selectors.inputDificultad.value = "";
        selectors.titulo.style.color = "black";
      }, 2000);
      return false;
    }
    if (!estadoDelJuego.iniciado) {
      if (dificultad <= 5) {
        estadoDelJuego.energia = 50 + (dificultad - 1 * 10);
      }else{
        estadoDelJuego.energia = 70 - (dificultad - 1 * 10);
      }
    }
    return true;
  };

  const cleanGameScene = () => {
    setTimeout(() => {
      selectors.btnJugar.classList.add("btnJugarGrande");
      selectors.btnJugar.innerHTML = "";
    }, 1000);
  };

  const resetGameScene = () => {
    setTimeout(() => {
      selectors.btnJugar.classList.remove("btnJugarInicio");
      selectors.btnJugar.classList.remove("btnDescargado");
      selectors.btnJugar.classList.remove("btnJugarGrande");
      selectors.btnJugar.classList.remove("btnCargado");
      selectors.btnJugar.innerHTML = "Jugar";
      estadoDelJuego.energia = 20;
      estadoDelJuego.iniciado = false;
      estadoDelJuego.punto = false;
      selectors.inputDificultad.style.background = `white`;
      selectors.inputDificultad.value = ``;
    }, 3000);
  };

  const countdownToStart = () => {
    let counter = 3;
    const countdown = setInterval(() => {
      if (counter === 0) {
        selectors.btnJugar.innerHTML = "Ya!";
        selectors.btnJugar.classList.add("btnJugarInicio");
        setTimeout(() => {
          selectors.btnJugar.innerHTML = "";
        }, 500);
        clearInterval(countdown);
      } else {
        selectors.btnJugar.innerHTML = counter;
      }
      counter--;
    }, 1000);
  };

  const setScene = () => {
    selectors.titulo.innerHTML = `Apretá el botón cuando se ilumine. Energia ${estadoDelJuego.energia}`;
    countdownToStart();
  };

  const play = (dificultad) => {
    return setInterval(() => {
      selectors.btnJugar.classList.add("btnActivo");
      setTimeout(() => {
        selectors.btnJugar.classList.remove("btnActivo");
      }, calcularTiempoApagado(dificultad));
    }, calcularTiempoEncendido(dificultad));
  };

  const updateEnergia = () => {
    selectors.inputDificultad.style.background = `linear-gradient(to left, white ${
      100 - estadoDelJuego.energia
    }%,10%,darkgoldenrod)`;
    selectors.titulo.innerHTML = `Apretá el botón cuando se ilumine. Energia ${estadoDelJuego.energia}`;
  };

  const calcularTiempoApagado = (dificultad) => {
    let tiempo = TIEMPO_APAGADO_DEFAULT;
    if (dificultad <= 5) {
      tiempo = TIEMPO_APAGADO_DEFAULT - dificultad * 100;
    } else {
      tiempo = TIEMPO_APAGADO_MINIMO;
    }

    return tiempo;
  };

  const calcularTiempoEncendido = (dificultad) => {
    let tiempo = TIEMPO_ENCENDIDO_DEFAULT;

    tiempo =
      TIEMPO_ENCENDIDO_DEFAULT -
      (dificultad - 5) * calculoRandomEncendido(dificultad);
    return tiempo;
  };
  const calculoRandomEncendido = (dificultad) => {
    let maximo = 800;
    switch (dificultad) {
      case 5:
        maximo = 350;
        break;
      case 6:
        maximo = 400;
        break;
      case 7:
        maximo = 550;
        break;
      case 8:
        maximo = 650;
        break;
      case 9:
        maximo = 750;
        break;
      case 10:
        maximo = 800;
    }
    return Math.floor(Math.random() * maximo) + 1;
  };
  selectors.btnJugar.addEventListener("click", (e) => startGame(e));
});
