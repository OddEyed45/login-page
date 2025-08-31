const express = require("express")
const cors = require("cors")
const connect = require("./connect.cjs")
const userRouter = require("./userRoutes.cjs")
const authRouter = require("./authRoutes.cjs")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const env = require('dotenv').config({path: "./config.env"})

const app = express()
const PORT = 3000

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", userRouter)
app.use("/auth", authRouter)
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/verify', (async function (request, response) {
    if (request.session.username)
    {
        console.log("went to the correct place in backend")
        return response.json({valid: true, username: request.session.username})
    }
    else
    {
        console.log("went here for some reason")
        return response.json({valid: false})
    }
}))

app.post('/login', (async function (request, response) {
    const db = connect.getDb()
    const user = await db.collection("users").findOne({
        username: request.body.username,
        password: request.body.password
    })
    if (!user) {
        return response.json({Login: false})
    }
    else {
        request.session.username = request.body.username
        
        console.log("we have the session username")
        return response.json({Login: true})
    }
}))

app.listen(PORT, () => {
    connect.connectToDb()
})