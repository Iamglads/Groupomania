/* user controller */ 

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const models = require("../models") // models sequelize
const log = console.log
require("dotenv").config()


// signup a new USER
exports.signup = (req, res) => {

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
        .then(() => res.status(201).send({ message: 'Votre compte a été créé! '}))
        .catch(error => res.status(400).send(log(error)))
    })
    .catch(error => res.status(500).send(log(error)))
      
}



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
                            isAdmin: user.isAdmin,
                            token: jwt.sign({ userId: user.id}, process.env.JWT_TOKEN, { expiresIn: '5h'})
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

exports.updateUser = (req, res, next) => {
    const firstname = req.body.firstname

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
            models.User.update({ 
            email: req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            password: hash,
            fonction: req.body.fonction,
            isAdmin: 0
        })
        .then(() => res.status(201).send({ message: `La modification de l'utilisateur: ${firstname} est éffectuée avec succès!`}))
        .catch(error => res.status(400).send(log(error)))
    })
    .catch(error => res.status(500).json(error))
} 

// delete a user by id
exports.deleteUser = (req, res, next) => {
    console.log(req.params.id)
    models.User.destroy( 
        {where: { id: req.params.id}
    })
    .then(() => res.status(200).send({ message: 'La suppression est effectuée!'}))
    .catch((error) => res.status(500).send(error))
}


// ajout d'une photo de profil
exports.addPicture = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN )
    const userId = decodedToken.userId;

    console.log(req.file)

    models.Picture.create({
        userId: userId,
        user_picture: `${req.protocol}://${req.get('host')}/images/users_pictures/${req.file.filename}`
    })
    .then(() => res.status(200).json('message: Votre photo a été enregistrée!'))
    .catch(err => console.log(err))
}
