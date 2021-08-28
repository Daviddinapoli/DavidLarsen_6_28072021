const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/createUser');

exports.signup = (req, res, next) => {
    //create hash for passord (10 = number of hash makes)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //create new user with ID and hashed password
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // save user infos in DB
        user.save()
        .then(() => res.status(201).json({ message:'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    //Find user in DB
    User.findOne({ email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé"});
            }
            //Compare input password with password in DB
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect"});
                    }
                    //If inputs are correct, return infos to frontend
                    res.status(200).json({
                        //Encode userId too to ensure security of user when created new product
                        userId: user._id,
                        //Create token 
                        token: jwt.sign(
                            { userId: user._id},
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({ error}));
};