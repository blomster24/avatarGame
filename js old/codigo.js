function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function eleccion(jugada) {
    let resultado = ""
    if (jugada == 1) {
        resultado = "Piedra ๐ชจ"
    } else if (jugada == 2) {
        resultado = "Papel ๐งป"
    } else if (jugada == 3) {
        resultado = "Tijera โ๏ธ"
    } else {
        resultado = "MAL ELEGIDO"
    }
    return resultado
}

function combate() {
    if (pc == jugador) {
        alert("EMPATE")
    } else if (jugador == 1 && pc == 3) {
        alert("YOU WIN! ๐")
        triunfos++
    } else if (jugador == 2 && pc == 1) {
        alert("YOU WIN! ๐")
        triunfos++
    } else if (jugador == 3 && pc == 2) {
        alert("YOU WIN! ๐")
        triunfos++
    } else {
        alert("YOU LOSE! ๐ญ")
        perdidas++
    }
}
// 1 es piedra
// 2 es papel
// 3 es tijera
let jugador = 0;
let pc = 0
let triunfos = 0
let perdidas = 0

while (triunfos < 3 && perdidas < 3) {
    pc = numAleatorio(1, 3)
    jugador = prompt("Elige: 1 para piedra, 2 para papel o 3 para tijera")

    //alert("Elegiste " + jugador)
    alert("Tu eliges: " + eleccion(jugador))
    alert("PC elige: " + eleccion(pc))
    combate()
}
alert("Ganaste " + triunfos + " veces y perdiste " + perdidas + " veces")