let playerAttack = ""
let enemyAttack = ""
let resultGame = ""
let playerLives = 3
let enemyLives = 3


function startGame() {
    let sectionSelectAttack = document.getElementById("select-attack")
    sectionSelectAttack.style.display = "none"
    let sectionRestart = document.getElementById("restart")
    sectionRestart.style.display = "none"


    let buttonAvatarPlayer = document.getElementById("avatar-button")
    buttonAvatarPlayer.addEventListener("click", selectAvatarPlayer)

    let buttonAir = document.getElementById("air-button")
    buttonAir.addEventListener("click", attackAir)
    let buttonFire = document.getElementById("fire-button")
    buttonFire.addEventListener("click", attackFire)
    let buttonWater = document.getElementById("water-button")
    buttonWater.addEventListener("click", attackWater)
    let buttonEarth = document.getElementById("earth-button")
    buttonEarth.addEventListener("click", attackEarth)

    let buttonRestart = document.getElementById("restart-button")
    buttonRestart.addEventListener("click", restartGame)

}

function selectAvatarPlayer() {


    let inputKorra = document.getElementById("korra")
    let inputAang = document.getElementById("aang")
    let inputRoku = document.getElementById("roku")
    let inputKyoshi = document.getElementById("kyoshi")

    let spanPlayerAvatar = document.getElementById("player-avatar")

    if (inputKorra.checked) {
        spanPlayerAvatar.innerHTML = "Korra"
    } else if (inputAang.checked) {
        spanPlayerAvatar.innerHTML = "Aang"
    } else if (inputRoku.checked) {
        spanPlayerAvatar.innerHTML = "Roku"
    } else if (inputKyoshi.checked) {
        spanPlayerAvatar.innerHTML = "Kyoshi"
    } else {
        alert("You didn't selected an Avatar")
    }

    if (spanPlayerAvatar.innerHTML != "") {
        let sectionSelectAvatar = document.getElementById("select-avatar")
        sectionSelectAvatar.style.display = "none"
        let sectionSelectAttack = document.getElementById("select-attack")
        sectionSelectAttack.style.display = "flex"
        selectEnemysAvatar()
    }

}

function selectEnemysAvatar() {
    let random = numRandom(1, 4)
    let enemysAvatar = ""
    let spanEnemysAvatar = document.getElementById("enemys-avatar")
    let spanPlayerAvatar = document.getElementById("player-avatar")
    if (spanPlayerAvatar.innerHTML == "") {

    } else {
        switch (random) {
            case 1: enemysAvatar = "Korra"
                break
            case 2: enemysAvatar = "Aang"
                break
            case 3: enemysAvatar = "Roku"
                break
            case 4: enemysAvatar = "Kyoshi"
                break
        }
        spanEnemysAvatar.innerHTML = " " + enemysAvatar + " "
    }
}

function attackAir() {
    playerAttack = "AIR"
    randomEnemyAttack()
}

function attackFire() {
    playerAttack = "FIRE"
    randomEnemyAttack()
}

function attackWater() {
    playerAttack = "WATER"
    randomEnemyAttack()
}

function attackEarth() {
    playerAttack = "EARTH"
    randomEnemyAttack()
}

function randomEnemyAttack() {
    let random = numRandom(1, 4)
    switch (random) {
        case 1:
            enemyAttack = "AIR"
            break;
        case 2:
            enemyAttack = "FIRE"
            break;
        case 3:
            enemyAttack = "WATER"
            break;
        case 4:
            enemyAttack = "EARTH"
            break
    }

    fight()
}

function fight() {
    let spanPlayerLives = document.getElementById("player-lives")
    let spanEnemyLives = document.getElementById("enemy-lives")


    if (playerAttack == "WATER" && (enemyAttack == "EARTH" || enemyAttack == "FIRE")) {
        resultGame = "YOU WON!! 🥳"
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else if (playerAttack == "EARTH" && enemyAttack == "FIRE") {
        resultGame = "YOU WON!! 🥳"
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else if (playerAttack == "FIRE" && enemyAttack == "AIR") {
        resultGame = "YOU WON!! 🥳"
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else if (playerAttack == "AIR" && (enemyAttack == "WATER" || enemyAttack == "EARTH")) {
        resultGame = "YOU WON!! 🥳"
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else if (playerAttack == enemyAttack) {
        resultGame = "TIE"
    } else {
        resultGame = "YOU LOST 😭"
        playerLives--
        spanPlayerLives.innerHTML = playerLives
    }
    createMessage()
    win()
}

function win() {
    if (enemyLives == 0) {
        createFinalMessage("YOU WON THE GAME!!!!!")
    } else if (playerLives == 0) {
        createFinalMessage("THE ENEMY WON THE GAME")
    }
}

function createMessage() {
    let sectionMessages = document.getElementById("result")
    let divPlayerAttack = document.getElementById("player-attacks")
    let divEnemyAttack = document.getElementById("enemy-attacks")

    let newPlayerAttack = document.createElement("p")
    let newEnemyAttack = document.createElement("p")

    sectionMessages.innerHTML = resultGame
    newPlayerAttack.innerHTML = playerAttack
    newEnemyAttack.innerHTML = enemyAttack

    divPlayerAttack.appendChild(newPlayerAttack)
    divEnemyAttack.appendChild(newEnemyAttack)
}

function createFinalMessage(result) {
    let sectionMessages = document.getElementById("result")

    sectionMessages.innerHTML = result

    let buttonAir = document.getElementById("air-button")
    buttonAir.disabled = true
    let buttonFire = document.getElementById("fire-button")
    buttonFire.disabled = true
    let buttonWater = document.getElementById("water-button")
    buttonWater.disabled = true
    let buttonEarth = document.getElementById("earth-button")
    buttonEarth.disabled = true

    let sectionRestart = document.getElementById("restart")
    sectionRestart.style.display = "block"
}

function restartGame() {
    location.reload()
}

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)