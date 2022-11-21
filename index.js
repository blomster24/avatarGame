const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id) {
        this.id = id;
    }

    setAvatar(avatar) {
        this.avatar = avatar
    }

    updatePosition(x, y) {
        this.x = x
        this.y = y
    }

    setAttacks(attacks) {
        this.attacks = attacks
    }
}

class Avatar {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`
    const player = new Player(id)
    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/avatar/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""
    const name = req.body.avatar || ""
    const avatar = new Avatar(name)

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].setAvatar(avatar)
    }

    console.log(players)
    console.log(playerId)
    res.end()
})

app.post("/avatar/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const playerIndex = players.findIndex((player) => playerId == player.id)

    if (playerIndex >= 0) {
        players[playerIndex].updatePosition(x, y)
    }

    const enemies = players.filter((player) => playerId !== player.id)

    res.send({
        enemies
    })
})

app.post("/avatar/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const attacks = req.body.attacks || []

    const playerIndex = players.findIndex((player) => playerId == player.id)

    if (playerIndex >= 0) {
        players[playerIndex].setAttacks(attacks)
    }
    res.end()
})

app.get("/avatar/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id == playerId)
    res.send({
        attacks: player.attacks || []
    })
})

app.listen(8080, () => {
    console.log("Server on")
})
