document.addEventListener("DOMContentLoaded", (event) => {
  const selectors = {};
  const estadoDelJuego = {
    iniciado: false,
    energia: 90,
    punto: false,
  };
  selectors.titulo = document.getElementById("titulo");
  selectors.inputDificultad = document.getElementById("inputDificultad");
  selectors.btnJugar = document.getElementById("btnJugar");
  selectors.container = document.body;
  let gameLoop = null;
  const startGame = (e) => {
    estadoDelJuego.punto = e.target.classList.contains("btnActivo");
    if (!estadoDelJuego.iniciado) {
      estadoDelJuego.iniciado = true;
      cleanGameScene();
      setScene();
      //set dificult
      gameLoop = play();
    }
    if (estadoDelJuego.energia === 100) {
      selectors.titulo.innerHTML = "Llenaste toda la energía, ganaste!";
      selectors.btnJugar.classList.add("btnCargado");
      selectors.inputDificultad.style.background = `green`;

      clearInterval(gameLoop);
      resetGameScene();
    } else if (estadoDelJuego.energia === 0) {
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
    selectors.titulo.innerHTML = "Apretá el botón cuando se ilumine.";
    countdownToStart();
  };

  const play = () => {
    return setInterval(() => {
      selectors.btnJugar.classList.add("btnActivo");
      setTimeout(() => {
        selectors.btnJugar.classList.remove("btnActivo");
      }, 2000);
    }, 4000);
  };

  const updateEnergia = () =>{
    selectors.inputDificultad.style.background = `linear-gradient(to left, white ${100 - estadoDelJuego.energia}%,10%,black)`;
  }
  selectors.btnJugar.addEventListener("click", (e) => startGame(e));
});
