/* user controller */ 

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const models = require("../models") // models sequelize
const log = console.log
require("dotenv").config()


// signup a new USER
exports.signup = (req, res) => {

    // verification des inputs avec le middlewares verfifyEmail
    // le password est haché avec la method hash de bcrypt
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
         models.User.create({
            email: req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: hash,
            fonction: req.body.fonction,
            isAdmin: 0
        })
        .then(() => res.status(201).send({ message: 'Utilisateur créé! '}))
        .catch(error => res.status(400).send(log(error)))
    })
    .catch(error => res.status(500).send(log(error)))
      
}

/*  On vérifie que les deux champs ne soient pas vide
    On compare le password rentré avec le password en BD avec bcrypt
    Si le password est valid:
    On connect l'utilisateur et le serveur nous renvoie un token, 
    le userId, le nom, le prénom et la fonction
*/
exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).send({ error: "Veuillez remplir tous les champs!" })
    }
    // vérification de l'email de l'utilisateur
    models.User.findOne({ where:{ email: email }}) 
        .then((user) => {
            if (!user) {
                return res.status(401).send({ message: "Utilisateur inexistant" })
            } else {
                bcrypt.compare(password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).send({ message: "Mot de passe incorrect!" })
                    } else {
                        res.status(200).send({
                            id: user.id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            fonction: user.fonction,
                            email: user.email,
                            token: jwt.sign({ userId: user.id}, process.env.JWT_TOKEN, { expiresIn: '2h'})
                        })
                    }
                    log("Vous êtes connecté!" + user.id)
                })
                .catch((error) => res.status(400).send(log(error)));
            }
           
        })
        .catch((error) => res.status(500).send(log(error)));
};

// get all user
exports.getAllUsers = (req, res, next) => {
    models.User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(404).send(error))
}

// get user 
exports.getUserId = (req, res, next) => {
    models.User.findOne({ id: req.params.id})
    .then((user) => { 
         res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            fonction: user.fonction,
         })
    })
    .catch((error) => res.status(500).send(log(error)))
    
}

//upadate a user by id 
exports.updateUser = (req, res, next) => {
    const firstname = req.body.firstname

    models.User.update(req.body, {
        where: { id: req.params.id}
    })
    .then(() => res.status(201).send({ message: `La modification de l'utilisateur: ${firstname} est éffectuée avec succès!`}))
    .catch(error => res.status(400).send(log(error)))
}

// delete a user by id
exports.deleteUser = (req, res, next) => {
    models.User.destroy({
        where: { id: req.params.id}
    })
    .then(() => res.status(200).send({ message: 'La suppression est effectuée!'}))
    .catch((error) => res.status(500).send(error))
}
