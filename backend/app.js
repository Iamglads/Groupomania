const express = require('express')
const bodyParser = require('body-parser')

// application express

const app = express()

//security
const cors = require('cors')
const helmet = require('helmet')



app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(helmet())
app.use(cors())


// all  routes users posts comments likes 
const routes = require('./routes/routes')




// use route
app.use('/api', routes)


module.exports = app