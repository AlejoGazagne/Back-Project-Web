const express = require('express')
const cors = require('cors')
const router = require('./router/router.js')
const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')
const desiredPort = process.env.PORT ?? 1234

app.get('/', (req, res) => {
    res.send('Hello word')
})

app.get('/', (req, res) => {

})

app.listen(desiredPort, () => {
    console.log(`App listening on port http://localhost:${desiredPort}`)
})