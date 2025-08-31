const express = require("express")
const database = require("./connect.cjs")
const ObjectId = require("mongodb").ObjectId

const authRouter = express.Router()

authRouter.route("/users").get(
    async (request, response) => {
        let db = database.getDb()
        let users = await db.collection("users").findOne({
            username: request.query.username,
            password: request.query.password
        })

        response.json(users)
    }
)

module.exports = authRouter