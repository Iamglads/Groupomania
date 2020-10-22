exports.validate = (req, res, next) => {
    
  /*   const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/


    if (req.body.email == null || req.body.firstname == null || req.body.lastname == null || req.body.password == null) {
        return res.status(400).json({ 'error': 'Veuillez bien remplir les champs!' })
    }
    if (!EMAIL_REGEX.test(req.body.email)) {
        return res.status(400).json({ 'error': 'email est invalide!'})
    }
  /*   if (!PASSWORD_REGEX.test(req.body.password)) {
        return res.status(400).json({ 'error': 'Le mot de passe est invalide'})
    } */ 
} 