const express = require('express')
// const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()
// app.use(cors({
        // origin: "*"
    // })
// )
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')


// db schema - user
require('./models/user')
require('./models/post')

// route handler + using routes 
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// db connection
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',() =>{
    console.log("db connected")
})
mongoose.connection.on('error',(err) =>{
    console.log("error",err)
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,() => {
    console.log("server is running")
})