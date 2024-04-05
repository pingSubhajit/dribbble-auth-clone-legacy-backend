import express from 'express'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
