require("dotenv").config()

const express = require("express")
const cors = require('cors')
const router = require("./routes/quizRoutes")
const connectDB = require("./config/mongoDB")


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json());

app.use('/api', router);

connectDB()
    .then(() => {
        console.log("Database connected Successfully...")
        app.listen(process.env.PORT, () =>{ 
            console.log(`Server is running on port 3000...`)
        })
    })
    .catch((err) => {
        console.log("connection to database failed!!!")
    })

