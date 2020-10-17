const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// application express

const app = express()

//security
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

//const cors = require('cors')
const helmet = require('helmet')


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(helmet())
//app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')))

// all  routes users posts comments likes 
const routes = require('./routes/routes')




// use route
app.use('/api', routes)


module.exports = app