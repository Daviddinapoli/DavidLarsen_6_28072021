const Sauce = require("../models/createsauce");

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const url = req.protocol + '://' + req.get('host');
    delete req.body._id;

    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        heat: req.body.sauce.heat,
        imageUrl: url + '/images/' + req.file.filename,
    });

    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce registered !'}))
      .catch(error => res.status(400).json({ message: error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modified !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce deleted !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res) => {
    const sauceObject = req.body
    const userId = sauceObject.userId
    const like = sauceObject.like

    Sauce.findOne({
        _id: req.params.id
    }) //getting item's ID
        .then((sauce) => {
            if (like == 1) {
                sauce.usersLiked.push(userId) //push likes
                sauce.likes++
            } else if (like == -1) {
                sauce.usersDisliked.push(userId)
                sauce.dislikes++
            } else if (like == 0 && sauce.usersLiked.includes(userId)) {
                sauce.likes--
                let arr = sauce.usersLiked.indexOf(userId)
                sauce.usersLiked.splice(arr, 1)
            } else if (like == 0 && sauce.usersDisliked.includes(userId)) {
                sauce.dislikes--
                let arr = sauce.usersDisliked.indexOf(userId)
                sauce.usersDisliked.splice(arr, 1)
            }
            // updating the sauce now 
            Sauce.updateOne({
                _id: req.params.id
            }, {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                dislikes: sauce.dislikes,
                likes: sauce.likes,
                _id: req.params.id
            })
                .then(() => res.status(200).json({
                    message: 'Objet modifié !'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
        .catch(error => res.status(400).json({
            error
        }));
}