const express = require('express')
const dotenv = require ('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware.js')
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(errorHandler)

app.use("/api/patient",require("./routes/patientRoutes.js"))
app.use("/api/doctor",require("./routes/doctorRoutes.js"))


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));