const models = require('../models')
const fs = require('fs')
const auth = require('../middlewares/auth')

// create posts and get ressources with multer
exports.createPost = (req, res, next) => {

    if (!req.body.title) {
        return res.status(400).json({message: 'Veuillez mettre le titre de la publication!'})
    }

    models.User.findOne() 
    .then((userFound) => {
        if(!userFound) {
            return res.status(400).json({ message: "Nous ne pouvons pas identifier l'utilisateur"})
        } else {
            models.Post.create({
                title: req.body.title,
                content: req.body.content,
                //attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                UserId: userFound.id,
                likes: 0,
                include:[{ model: models.User, attributes: [ 'firstname', 'lastname']}]
            })
            .then(() => res.status(201).json({message:  "Publication enregistrée!"}))
            .catch(error => res.status(400).json(error))

        }
    })
    .catch(error => res.status(500).json(error))

}


// get all posts from database
exports.getAllPosts = (req, res, next) => {
    const order = req.query.order
    
    models.Post.findAll({
        order: [(order != null ? order.split(':') : ['createdAt', 'DESC'])],
        include:[{ model: models.User, attributes: [ 'firstname', 'lastname']}]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).send(error))
}



// get one post with id 
exports.getPostId = (req, res, next) => {

    models.Post.findById({ id: req.params.id}, {include: ['firstname', 'lastname']})
    .then((post) => res.status(200).send(post))
    .catch((error) => res.status(500).send(error))

}



// update post
exports.updatePost = (req, res, next) => {
    models.Post.updateOne({ where: {id: req.params.id}})
        .then(() => res.status(200).send({message: 'Vous avez modifié votre publication!'}))
        .catch((error) => res.status(400).send(error))      
}



// delete post 
exports.deletePost = (req, res, next) => {

    models.Post.destroy({ where: {id: req.params.id}})
        .then(() => res.status(200).send({message: 'Vous avez supprimé une publication!'}))
        .catch((error) => res.status(500).send(error))

}


