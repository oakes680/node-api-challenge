const express = require("express")

const actionsRouter = require('./actions/actionsRouter')
const projectsRouter = require('./projects/projectsRouter')

const cors = require('cors')


const server = express()

server.use(express.json())
server.use(cors());

server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)


server.get('/', (req, res) => {
    res.send(`<h2> welcome to thunderdome </h2>`)
})

const port = 8888

server.listen(port, () => {
    console.log(`server running on ${port}`)
})
