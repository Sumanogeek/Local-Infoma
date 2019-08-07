const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc get All Items
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

//@route POST api/items
//@desc Create A post
//@access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        location: req.body.location,
        link: req.body.link
    });
    newItem.save().then(item => res.json(item));
});

//@route POST api/items
//@desc Create A post
//@access Public
router.delete('/:id', (req, res) => {
    /*//Item.findOneAndDelete({location: req.params.id}, function(error, doc) {
    Item.remove({location: req.params.id}, function(error, doc) {
        if (error) 
            res.status(404).json({message: error})
        else
            res.json({message: doc})
      })
    */
    Item.findByIdAndDelete(req.params.id)
        //.then(item => item.remove().then(() => res.json({success: true})))
        .then(() => res.json({success: true}))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;