function startGame() {
    let buttonPetPlayer = document.getElementById("pet-button")
    buttonPetPlayer.addEventListener("click", selectPetPlayer)
}

function selectPetPlayer() {
    let result = "You selected "
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let inputLangostelvis = document.getElementById("langostelvis")
    let inputTucapalma = document.getElementById("tucapalma")
    let inputPydos = document.getElementById("pydos")
    let spanPlayerPet = document.getElementById("player-pet")

    if (inputHipodoge.checked) {
        result += "Hipodoge"
        spanPlayerPet.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked) {
        result += "Capipepo"
        spanPlayerPet.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked) {
        result += "Ratigueya"
        spanPlayerPet.innerHTML = "Ratigueya"
    } else if (inputLangostelvis.checked) {
        result += "Langostelvis"
        spanPlayerPet.innerHTML = "Langostelvis"
    } else if (inputTucapalma.checked) {
        result += "Tucapalma"
        spanPlayerPet.innerHTML = "Tucapalma"
    } else if (inputPydos.checked) {
        result += "Pydos"
        spanPlayerPet.innerHTML = "Pydos"
    } else {
        result = ""
        //result = "You didn't select a pet"
    }
    //alert(result)
    selectEnemysPet()
    
}

function selectEnemysPet() {
    let random = numRandom(1, 6)
    let enemysPet = ""
    let spanEnemysPet = document.getElementById("enemys-pet")
    let spanPlayerPet = document.getElementById("player-pet")
    if (spanPlayerPet.innerHTML == "") {

    } else {
        switch (random) {
            case 1: enemysPet = "Hipopego"
                break
            case 2: enemysPet = "Capipepo"
                break
            case 3: enemysPet = "Ratigueya"
                break
            case 4: enemysPet = "Langostelvis"
                break
            case 5: enemysPet = "Tucapalma"
                break
            case 6: enemysPet = "Pydos"
                break
        }
        spanEnemysPet.innerHTML = " " + enemysPet + " "
    }
}

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", startGame)