const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const pageRoutes = require('./routes/page')

const key = require('./keys/dev')
const PORT = process.env.PORT

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(pageRoutes)

app.listen(PORT,()=>{
    console.log('server is running')
})

function start(){
    try {
        mongoose.connect(key.MONGOURI,{
            useNewUrlParser: true
        })
    } catch (error) {
        console.log(error)
    }
}

start()