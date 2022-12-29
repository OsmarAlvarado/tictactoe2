//variable jugadores
let playerX = 'x'
let playerO = 'o'

//variable combinacion de victoria
let combWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
] //objetos

//CREAMOS EL DOM
let cels = document.querySelectorAll('[data-cel]') //celdas
let boardCel = document.getElementById('board') //cuerpo de celdas
let elementWining = document.getElementById('win')//elemento dek div del win
let btnRestart = document.querySelector('#BtnRestar')//dom del boton
let textWining = document.querySelector('#textWining')//div del mensaje del ganador
let turnPlayerO = false //iniciacion de los turnos del jugador O, en X
console.log(btnRestart);

//star

//creamos el EventListener
start()
btnRestart.addEventListener('click', start) //evento del boton restar

function start() {
    turnPlayerO = false //significa que el primero en reproducirse, sera el caracter X
    cels.forEach(cel => {
        cel.classList.remove(playerX) //elimina al jugador
        cel.classList.remove(playerO) //elimina al jugador
        cel.removeEventListener('click', celInit) //evento que se ejecuta cuando se inicia el juego
        cel.addEventListener('click', celInit, { once: true }) //devuelve la llamada del evento, una sola vez
    })
    boardHover() //esta funcion mas adelante se muestra
    elementWining.classList.remove('focus') //elimina el elemento con clase llamada focus
}



//funcion que entra en el start
function celInit(e) { //funcion del evento click para las celdas
    const celd = e.target //se refiere al elemento clickeado
    let savePlayer = turnPlayerO ? playerO : playerX  //guarda los personajes a quien le toque
    clickArea(celd, savePlayer) //funcion que mas adelante explica el porque estara aqui dentro
    //se usa otra funcion para verificar si alguien ya gano, comparando las combinaciones ganadoras.
    //y se determina si hay empate o no
    if (victoryCheck(savePlayer)) {   //funcion de chequeo si se cumple, mas adelante se hace la funcion
        gameFinish(false)  //esta funcion mas adelante se muestra (el juego continua)
    } else if (isTie()) { //declaracion si hay empate
        gameFinish(true)
    } else {
        variusTurns() //esta funcion mas adelante se muestra
        boardHover()
    }

}

//la función que se llama para comprobar si nuestro tablero coincide con alguna de las combinaciones ganadoras.
function victoryCheck(savePlayer) {
    return combWin.some(combination => { //comprueba si al menos un elemento del array cumple con la condición implementada por la función.
        return combination.every(index => { //prueba si todos los elementos de la matriz pasan la prueba implementada por la función
            return cels[index].classList.contains(savePlayer)
        })
    })
}

//funcion de cuando termina el juego
function gameFinish(tie) {
    //condicion de lo que se va a mostrar o dibujar cuando se termina el juego
    if (tie) {
        textWining.innerText = 'This is a tie'  //cuando termine en empate
    } else {
        textWining.innerText = `The player with ${turnPlayerO ? "O" : "X"} is win`  // mensaje cuando uno de los 2 jugadores gane
    }
    elementWining.classList.add('focus')  //clase creada para el CSS cuando se marque el termino del juego
}


//funcion unicamente si hay empate
function isTie() {
    return [...cels].every(celd => { //verifica todos los elementos de una matriz para confirmar una condición al devolver un valor booleano.
        return celd.classList.contains(playerX) || celd.classList.contains(playerO)
    })
}

//coloca al personaje en la celda, el savePlayer, siendo una X o una O, dependiendo a quien le toque
function clickArea(celd, savePlayer) {
    celd.classList.add(savePlayer)
}

//Esta función es la que intercambia los turnos después de colocar al personaje en una celda.
function variusTurns() {
    turnPlayerO = !turnPlayerO
}

//para hacer interactivo el cursor o mouse
function boardHover() {
    boardCel.classList.remove(playerX)
    boardCel.classList.remove(playerO)
    if (turnPlayerO) {
        boardCel.classList.add(playerO)
    } else {
        boardCel.classList.add(playerX)
    }
}



