const express = require("express")
const database = require("./connect.cjs")
const ObjectId = require("mongodb").ObjectId

const userRouter = express.Router()

userRouter.route("/users").get(
    async (request, response) => {
        let db = database.getDb()
        let users = await db.collection("users").find().toArray()
        if (users.length > 0)
        {
        response.json(users)
        }
        else {
            throw new Error("Data was not found")
        }
    }
)

userRouter.route("/users:id").get(
    async (request, response) => {
        let db = database.getDb()
        let users = await db.collection("users").findOne({_id: new ObjectId(request.params.id)})
        
        response.json(users)
    }
)

userRouter.route("/users").post(
    async (request, response) => {
        let db = database.getDb()
        const obj = {
            username: request.body.username,
            password: request.body.password,
            dateCreated: request.body.dateCreated
        }

        let user = await db.collection("users").findOne({username: request.body.username})
        if ((user))
            return response.status(409).json({error: "Username taken"})
        if (request.body.password.match(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/) == null)
            return response.status(409).json({error: "Choose another password"})


        let data = await db.collection("users").insertOne(obj)
        
        response.json(data)
    }
)

userRouter.route("/users:id").put(
    async (request, response) => {
        let db = database.getDb()
        const obj = {
            username: request.body.username,
            password: request.body.password,
            dateCreated: request.body.dateCreated
        }
        let data = await db.collection("users").updateOne({_id: new ObjectId(request.params.id)}, {$set: {obj}})
        
        response.json(data)
    }
)

userRouter.route("/users:id").delete(
    async (request, response) => {
        let db = database.getDb()
        let data = await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)})
        
        response.json(data)
    }
)


module.exports = userRouter