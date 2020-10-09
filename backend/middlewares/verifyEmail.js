const models = require('../models')


exports.verifyEmail = (req, res, next) => {
    models.User.findOne({ where: { email: req.body.email}})
    .then(email => {
        if(email) {
            return res.status(500).send({ message: "Cet email existe déjà utilisé!"})
        }
        next()
    })
    .catch(error => res.status(500).send(error))
}