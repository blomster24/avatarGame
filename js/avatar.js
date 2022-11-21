// CONSTANTS
// REFERENCES TO DOM
const sectionSelectAttack = document.getElementById("select-attack")
const sectionRestart = document.getElementById("restart")
const buttonAvatarPlayer = document.getElementById("avatar-button")
const buttonRestart = document.getElementById("restart-button")
const divButtons = document.getElementById("container-buttons")

const spanPlayerAvatar = document.getElementById("player-avatar")
const spanEnemysAvatar = document.getElementById("enemys-avatar")

const sectionSelectAvatar = document.getElementById("select-avatar")

const spanPlayerLives = document.getElementById("player-lives")
const spanEnemyLives = document.getElementById("enemy-lives")

const sectionMessages = document.getElementById("result")
const divPlayerAttack = document.getElementById("player-attacks")
const divEnemyAttack = document.getElementById("enemy-attacks")
const cardContainer = document.getElementById("card-container")

const sectionViewMap = document.getElementById('view-map')
const map = document.getElementById('map')

let playerId = null
let enemyId = null
let avatars = [];
let avatarsEnemies = []// estas dos son las mismas que ellos tienen en singular
let playerAttacks = []
let enemyAttacks = [] //Los ataques que ha lanzado el enemigo
let playerAttack
let enemyAttack = ""
let optionAvatar
let inputKorra
let inputAang
let inputRoku
let inputKyoshi
let avatarPlayer
let avatarPlayerObject
let avatarAttack
let buttonAir
let buttonFire
let buttonWater
let buttonEarth
let buttons = []
let enemyAvatarAttacks //Los ataques que puede lanzar el enemigo
let indexPlayerAttack
let indexEnemyAttack
let playerVictories = 0
let enemyVictories = 0
let playerLives = 3
let enemyLives = 3
let canv = map.getContext('2d')
let interval
let mapBackground = new Image()
mapBackground.src = "./assets/mapAvatar.jpg"
let heightSearched
let mapWidth = window.innerWidth - 20
const widthMax = 600

if (mapWidth > widthMax) {
    mapWidth = widthMax - 20
}

heightSearched = mapWidth * 600 / 800
map.width = mapWidth
map.height = heightSearched

// CLASSES

class Avatar {
    constructor(name, image, lives, mapImage, id = null) {
        this.id = id
        this.name = name;
        this.image = image;
        this.lives = lives;
        this.attacks = []
        this.width = 50
        this.height = 70
        this.x = numRandom(0, map.width - this.width)
        this.y = numRandom(0, map.height - this.height)
        this.mapImage = new Image()
        this.mapImage.src = mapImage
        this.speedX = 0
        this.speedY = 0
    }

    drawAvatar() {
        canv.drawImage(
            this.mapImage,
            this.x,
            this.y,
            this.width,
            this.height)
    }

}

let korra = new Avatar("Korra", "./assets/korra.png", 3, "./assets/korraCanvas.png")
let aang = new Avatar("Aang", "./assets/Avatar_Aang.png", 5, "./assets/aangCanvas.png")
let roku = new Avatar("Roku", "./assets/roku.png", 4, "./assets/rokuCanvas.png")
let kyoshi = new Avatar("Kyoshi", "./assets/kyoshi.png", 3, "./assets/kyoshiCanvas.png")



const LIST_OF_ATTACKS = [
    { name: "💧", id: "water-button" },
    { name: "💨", id: "air-button" },
    { name: "🔥", id: "fire-button" },
    { name: "🌱", id: "earth-button" }
]

korra.attacks.push(...LIST_OF_ATTACKS)
aang.attacks.push(...LIST_OF_ATTACKS)
kyoshi.attacks.push(...LIST_OF_ATTACKS)
roku.attacks.push(...LIST_OF_ATTACKS)

avatars.push(korra, aang, roku, kyoshi)

function startGame() {
    sectionViewMap.style.display = "none"
    sectionSelectAttack.style.display = "none"
    sectionRestart.style.display = "none"

    avatars.forEach((avatar) => {
        optionAvatar = `
        <input type="radio" name="avatar" id="${avatar.name}">
        <label class="avatar-card" for="${avatar.name}">
            <p>${avatar.name}</p>
            <img src="${avatar.image}" alt="${avatar.name}">
        </label>
        `
        cardContainer.innerHTML += optionAvatar

        inputKorra = document.getElementById("Korra")
        inputAang = document.getElementById("Aang")
        inputRoku = document.getElementById("Roku")
        inputKyoshi = document.getElementById("Kyoshi")

    })

    buttonAvatarPlayer.addEventListener("click", selectAvatarPlayer)

    buttonRestart.addEventListener("click", restartGame)
    joinToGame()
}
/*

---------------BACKEND SECTION
                                ↓↓↓↓↓↓↓
*/
function joinToGame() {
    fetch("http://localhost:8080/join", { method: "get" }) // en method se puede poner get post 
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respo) {
                        console.log(respo);
                        playerId = respo
                    })
            }
        })

}

function selectAvatar(avatarPlayer) {
    fetch(`http://localhost:8080/avatar/${playerId}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: avatarPlayer
            })
        })
}

function sendPosition(x, y) {
    fetch(`http://localhost:8080/avatar/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemies }) {
                        console.log(enemies);
                        if (enemies.length === 0) {
                            console.log("No hay enemigos");
                        } else {
                            avatarsEnemies = enemies.map(function (enemy) {
                                let avatarEnemy = null
                                const avatarName = enemy.avatar.name || ""
                                if (avatarName === "Korra") {
                                    avatarEnemy = new Avatar("Korra", "./assets/korra.png", 3, "./assets/korraCanvas.png", enemy.id)
                                } else if (avatarName === "Aang") {
                                    avatarEnemy = new Avatar("Aang", "./assets/Avatar_Aang.png", 5, "./assets/aangCanvas.png", enemy.id)
                                } else if (avatarName === "Roku") {
                                    avatarEnemy = new Avatar("Roku", "./assets/roku.png", 4, "./assets/rokuCanvas.png", enemy.id)
                                } else if (avatarName === "Kyoshi") {
                                    avatarEnemy = new Avatar("Kyoshi", "./assets/kyoshi.png", 3, "./assets/kyoshiCanvas.png", enemy.id)
                                }
                                avatarEnemy.x = enemy.x
                                avatarEnemy.y = enemy.y
                                return avatarEnemy
                            })
                        }
                    })
            }
        })
}

function sendAttacks() {
    fetch(`http://192.168.18.3:8080/avatar/${playerId}/attacks`), {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttacks
        })
    }
    interval = setInterval(getAttacks, 50)
}

function getAttacks() {
    fetch(`http://192.168.18.3:8080/avatar/${enemyId}/attacks`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ attacks }) {
                        if (attacks.length === 4) {
                            enemyAttacks = attacks
                            fight()
                        }
                    })
            }
        })
}

/*
                                ↑↑↑↑↑
---------------BACKEND SECTION

*/
function selectAvatarPlayer() {
    if (inputKorra.checked) {
        spanPlayerAvatar.innerHTML = inputKorra.id
        avatarPlayer = inputKorra.id
    } else if (inputAang.checked) {
        spanPlayerAvatar.innerHTML = inputAang.id
        avatarPlayer = inputAang.id
    } else if (inputRoku.checked) {
        spanPlayerAvatar.innerHTML = inputRoku.id
        avatarPlayer = inputRoku.id
    } else if (inputKyoshi.checked) {
        spanPlayerAvatar.innerHTML = inputKyoshi.id
        avatarPlayer = inputKyoshi.id
    } else {
        alert("You didn't selected an Avatar")
    }

    selectAvatar(avatarPlayer)

    if (spanPlayerAvatar.innerHTML != "") {
        sectionSelectAvatar.style.display = "none"
        extractAttacks(avatarPlayer)
        startMap()
        //sectionSelectAttack.style.display = "flex"
        //selectEnemysAvatar()
    }

}

function extractAttacks(avatarPlayer) {
    let attacks
    for (let i = 0; i < avatars.length; i++) {
        if (avatarPlayer == avatars[i].name) {
            attacks = avatars[i].attacks
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {

    attacks.forEach((attack) => {
        avatarAttack = `
                <button id="${attack.id}" class="button-attack BAttack" alt="${attack.name}">${attack.name}</button>
        `
        divButtons.innerHTML += avatarAttack
    })

    buttonAir = document.getElementById("air-button")
    buttonFire = document.getElementById("fire-button")
    buttonWater = document.getElementById("water-button")
    buttonEarth = document.getElementById("earth-button")

    buttons = document.querySelectorAll(".BAttack")
}

function attackSecuence() {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                playerAttack = "FIRE"
                playerAttacks.push("FIRE")
                console.log(playerAttacks)
                button.style.background = "#112f58"
                button.disabled = true
            }
            else if (e.target.textContent === "💧") {
                playerAttack = "WATER"
                playerAttacks.push("WATER")
                console.log(playerAttacks)
                button.style.background = "#112f58"
                button.disabled = true
            }
            else if (e.target.textContent === "💨") {
                playerAttack = "AIR"
                playerAttacks.push("AIR")
                console.log(playerAttacks)
                button.style.background = "#112f58"
                button.disabled = true
            }
            else {
                playerAttack = "EARTH"
                playerAttacks.push("EARTH")
                console.log(playerAttacks)
                button.style.background = "#112f58"
                button.disabled = true
            }
            //randomEnemyAttack()
            if (playerAttacks.length === 4) {
                sendAttacks()
            }
        })
    })

}


function selectEnemysAvatar(enemy) {
    /* let random = numRandom(0, avatars.length - 1)
    spanEnemysAvatar.innerHTML = avatars[random].name
    enemyAvatarAttacks = avatars[random].attacks */
    spanEnemysAvatar.innerHTML = enemy.name
    enemyAvatarAttacks = enemy.attacks
    attackSecuence()
}

function randomEnemyAttack() {
    let random = numRandom(0, enemyAvatarAttacks.length - 1)
    switch (random) {
        case 0:
            enemyAttack = "AIR"
            enemyAttacks.push("AIR")
            break;
        case 1:
            enemyAttack = "FIRE"
            enemyAttacks.push("FIRE")
            break;
        case 2:
            enemyAttack = "WATER"
            enemyAttacks.push("WATER")
            break;
        case 3:
            enemyAttack = "EARTH"
            enemyAttacks.push("EARTH")
            break
    }
    startFight()
    //fight()
}

function startFight() {
    if (playerAttacks.length === 4) {
        fight()
    }
}

function indexOpponents(player, enemy) {
    indexPlayerAttack = playerAttacks[player]
    indexEnemyAttack = enemyAttacks[enemy]
}

function fight() {
    clearInterval(interval)

    for (let i = 0; i < playerAttacks.length; i++) {
        if (playerAttacks[i] == "WATER" && (enemyAttacks[i] == "EARTH" || enemyAttacks[i] == "FIRE")) {
            indexOpponents(i, i)
            createMessage("YOU WON!! 🥳")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
            divPlayerAttack.childNodes[i].innerHTML += "✅"
            divEnemyAttack.childNodes[i].innerHTML += "❌"
        } else if (playerAttacks[i] == "EARTH" && enemyAttacks[i] == "FIRE") {
            indexOpponents(i, i)
            createMessage("YOU WON!! 🥳")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
            divPlayerAttack.childNodes[i].innerHTML += "✅"
            divEnemyAttack.childNodes[i].innerHTML += "❌"
        } else if (playerAttacks[i] == "FIRE" && enemyAttacks[i] == "AIR") {
            indexOpponents(i, i)
            createMessage("YOU WON!! 🥳")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
            divPlayerAttack.childNodes[i].innerHTML += "✅"
            divEnemyAttack.childNodes[i].innerHTML += "❌"
        } else if (playerAttacks[i] == "AIR" && (enemyAttacks[i] == "WATER" || enemyAttacks[i] == "EARTH")) {
            indexOpponents(i, i)
            createMessage("YOU WON!! 🥳")
            playerVictories++
            spanPlayerLives.innerHTML = playerVictories
            divPlayerAttack.childNodes[i].innerHTML += "✅"
            divEnemyAttack.childNodes[i].innerHTML += "❌"
        } else if (playerAttacks[i] == enemyAttacks[i]) {
            indexOpponents(i, i)
            createMessage("TIE")
            divPlayerAttack.childNodes[i].innerHTML += "🟡"
            divEnemyAttack.childNodes[i].innerHTML += "🟡"
        } else {
            indexOpponents(i, i)
            createMessage("YOU LOST 😭")
            enemyVictories++
            spanEnemyLives.innerHTML = enemyVictories
            divPlayerAttack.childNodes[i].innerHTML += "❌"
            divEnemyAttack.childNodes[i].innerHTML += "✅"
        }
    }
    checkWins()
}

function checkWins() {
    if (playerVictories > enemyVictories) {
        createFinalMessage("YOU WON THE GAME!!!!!")
    } else if (enemyVictories > playerVictories)
        createFinalMessage("THE ENEMY WON THE GAME")
    else {
        createFinalMessage("IT'S A TIE")
    }
}

function createMessage(resultGame) {

    let newPlayerAttack = document.createElement("p")
    let newEnemyAttack = document.createElement("p")

    sectionMessages.innerHTML = resultGame
    sectionMessages.style.fontWeight = "bold"
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack

    divPlayerAttack.appendChild(newPlayerAttack)
    divEnemyAttack.appendChild(newEnemyAttack)
}

function createFinalMessage(result) {
    let sectionMessages = document.getElementById("result")

    sectionMessages.innerHTML = result

    buttonAir
    buttonFire.disabled = true
    buttonWater.disabled = true
    buttonEarth.disabled = true

    sectionRestart.style.display = "block"
}

function restartGame() {
    location.reload()
}

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawCanvas() {
    avatarPlayerObject.x += avatarPlayerObject.speedX
    avatarPlayerObject.y += avatarPlayerObject.speedY
    sectionViewMap.style.display = 'flex'
    canv.clearRect(0, 0, map.clientWidth, map.clientHeight)
    canv.drawImage(mapBackground, 0, 0, map.width, map.height)

    avatarPlayerObject.drawAvatar()
    sendPosition(avatarPlayerObject.x, avatarPlayerObject.y)
    avatarsEnemies.forEach(function (avatar) {
        avatar.drawAvatar()
        checkCollision(avatar)
    })
}

function moveUp() {
    avatarPlayerObject.speedY = -5

}
function moveLeft() {
    avatarPlayerObject.speedX -= 5
}
function moveRight() {
    avatarPlayerObject.speedX = 5
}
function moveDown() {
    avatarPlayerObject.speedY = 5
}

function stopMovement() {
    avatarPlayerObject.speedX = 0
    avatarPlayerObject.speedY = 0
}

function keyPressed(event) {
    switch (event.key) {
        case "ArrowUp":
            moveUp()
            break;
        case "ArrowLeft":
            moveLeft()
            break;
        case "ArrowRight":
            moveRight()
            break;
        case "ArrowDown":
            moveDown()
            break;
    }
}

function getObjectAvatar() {
    for (let i = 0; i < avatars.length; i++) {
        if (avatarPlayer == avatars[i].name) {
            return avatars[i]
        }
    }
}

function startMap() {
    avatarPlayerObject = getObjectAvatar()

    interval = setInterval(drawCanvas, 50)
    window.addEventListener("keydown", keyPressed)
    window.addEventListener("keyup", stopMovement)
}

function checkCollision(enemy) {
    const topAvatar = avatarPlayerObject.y
    const bottomAvatar = avatarPlayerObject.y + avatarPlayerObject.height
    const rightAvatar = avatarPlayerObject.x + avatarPlayerObject.width
    const leftAvatar = avatarPlayerObject.x

    const topEnemy = enemy.y
    const bottomEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x
    if (
        bottomAvatar < topEnemy ||
        topAvatar > bottomEnemy ||
        rightAvatar < leftEnemy ||
        leftAvatar > rightEnemy
    ) {
        return
    }
    stopMovement()
    clearInterval(interval)
    enemyId = enemy.id
    sectionSelectAttack.style.display = "flex"
    sectionViewMap.style.display = 'none'
    selectEnemysAvatar(enemy)
}

window.addEventListener("load", startGame)