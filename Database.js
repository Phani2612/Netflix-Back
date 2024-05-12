
const MongoDB = require("mongodb")
const { connection } = require("mongoose")

async function Connector()
{
    const Connection = await MongoDB.MongoClient.connect("mongodb+srv://Phani2612:2612@cluster0.nxfzz84.mongodb.net/Netflixdatabase?retryWrites=true&w=majority")


    // const Connection = await MongoDB.MongoClient.connect("mongodb://localhost:27017")

    let database = Connection.db("Netflixdatabase")

    return database

    
}

module.exports = {

    con : Connector
}