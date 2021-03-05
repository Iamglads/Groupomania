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
const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
 
//  apply to all requests
app.use(limiter);
app.use(helmet())

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


app.use('/images', express.static(path.join(__dirname, 'images')))

/*
	all  routes 
	users 
	posts 
	comments 
	likes 
*/ 

// routes
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')


// use route
app.use('/api', userRoute, postRoute, commentRoute)


module.exports = app