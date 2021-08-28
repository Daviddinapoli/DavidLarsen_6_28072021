const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");
const path = require('path');
const cors = require('cors');

const app = express()

app.use(cors())


mongoose.connect('mongodb+srv://daviddinapoli:mongoD88!@cluster0.bcxlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
  
  app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());
/*
app.post('/api/sauces', (req, res, next) => {
    const Sauce = new createSauce({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Sauce.save().then(
        () => {
            res.status(201).json({
                message: "Sauce added succesfully!"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.get("/api/sauces/:id", (req, res, next) => {
    createSauce.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(Sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

app.use("/api/sauces", (req, res, next) => {
    createSauce.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
**/

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
  
module.exports = app;