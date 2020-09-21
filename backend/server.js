const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes/apiRoute')



const app = express()

app.get('/', (req, res) => {
    res.json({ message: 'Test'})
})


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

const PORT = process.env.port || 8080.
app.listen(PORT, () => {
    console.log('app run at port:' + PORT)
})