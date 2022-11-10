let playerAttack = ""
let enemyAttack = ""
let resultGame = ""


function startGame() {
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
}

function selectAvatarPlayer() {
    let result = "You selected "
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
    }
    selectEnemysAvatar()

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
    if (playerAttack == "WATER" && (enemyAttack == "EARTH" || enemyAttack == "FIRE")) {
        resultGame = "YOU WON!! 🥳"
    } else if (playerAttack == "EARTH" && enemyAttack == "FIRE") {
        resultGame = "YOU WON!! 🥳"
    } else if (playerAttack == "FIRE" && enemyAttack == "AIR") {
        resultGame = "YOU WON!! 🥳"
    }else if(playerAttack=="AIR" &&(enemyAttack=="WATER"|| enemyAttack=="EARTH")){
        resultGame = "YOU WON!! 🥳"
    }else if(playerAttack==enemyAttack){
        resultGame = "TIE"
    }else{
        resultGame = "YOU LOST 😭"
    }

    createMessage()
}

function createMessage() {
    let sectionMessages = document.getElementById("messages")

    let paragragh = document.createElement("p")
    paragragh.innerHTML = "Your avatar attacked with " + playerAttack + ", enemy's avatar attacked with " + enemyAttack + " - " + resultGame

    sectionMessages.appendChild(paragragh)
}

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)