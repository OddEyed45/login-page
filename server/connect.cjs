const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})

const db_key = process.env.ATLAS_URI
const client = new MongoClient(db_key)

let database

module.exports = {
    connectToDb: () => {
        database = client.db("login_details")
    },
    getDb: () => {
        return database
    }
}