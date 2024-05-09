import express, { json } from 'express'
import cors from 'cors'
import router from './router/router.js'
const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')
const desiredPort = process.env.PORT ?? 1234

app.get('/', (req, res) => {
    res.send('Hello word')
})

app.listen(desiredPort, () => {
    console.log(`App listening on port http://localhost:${desiredPort}`)
})