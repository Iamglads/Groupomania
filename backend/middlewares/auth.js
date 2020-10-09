const jwt = require('jsonwebtoken')
const user = require('../models/user')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
        const userId = decodedToken.userId

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Utilisateur invalid'
        } else {
            next()
        }
    } catch {
        res.stats(401).json({ error: new Error(' Invalid request')})
    }
}