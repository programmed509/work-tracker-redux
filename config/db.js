const mongoose = require('mongoose')
const dbURL = "mongodb+srv://admin:admin123@cluster0.24bgs.mongodb.net/task?retryWrites=true&w=majority"

const connectDB = async () =>{
    try {
        await mongoose.connect(dbURL,{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
        console.log('Database Connected')
    } catch (error) {
        console.log('Error while connecting')
        process.exit(1)
    }
}

module.exports = connectDB;