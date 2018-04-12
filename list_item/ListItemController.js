var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Item = require('../item/Item');
var Location = require('../location/Location');
var List = require('../list/List');
var ListItem = require('./ListItem');

router.get('/:id', function(req, res){
  ListItem.findOne({_id: req.params.id}, function(err, listItem){
    if (err) return res.status(500).send("An error occured while trying to get ListItem with id: " + req.params.id);
    if (!listItem) return res.status(404).send("Could not find List Item with id: " + req.params.id);
    res.status(200).send(listItem);
  });
});

//TODO It seems like there should be a cleaner way to accomplish this.
router.post('/', function(req, res){
  var it;
  var li;
  var lo;
  Item.findOne({_id: req.body.itemId}, function(err, item){
    if (err) return res.status(500).send("There was an error trying to find Item with id: " + req.body.itemId);
    if (!item) return res.status(500).send("Could not find Item with name: " + req.body.itemId);
    it = item;
    List.findOne({_id: req.body.listId}, function(err, list){
      if (err) return res.status(500).send("There was an error trying to find List with id: " + req.body.listId);
      if (!list) return res.status(500).send("Could not find List with id: " + req.body.listId);
      li = list
      Location.findOne({_id: req.body.locationId}, function(err, location){
        if (err) return res.status(500).send("There was an error trying to find Location with id: " + req.body.locationId);
        if (!location) return res.status(500).send("Could not find Location with id: " + req.body.locationId);
        lo = location;
        ListItem.create({
          item: it,
          list: li,
          location: lo,
        },
        function(err, listItem){
          if (err) return res.status(500).send('There was an error while creating the ListItem.');
          if (!listItem) return res.status(500).send("List Item could not be created");
          res.status(200).send(listItem);
        });
      });
    });
  });
});

router.put('/', function(req, res){
  var it;
  var li;
  var lo;
  Item.findOne({_id: req.body.itemId}, function(err, item){
    if (err) return res.status(500).send("There was an error trying to find Item with id: " + req.body.itemId);
    if (!item) return res.status(500).send("Could not find Item with id: " + req.body.itemId);
    it = item;
    List.findOne({_id: req.body.listId}, function(err, list){
      if (err) return res.status(500).send("There was an error trying to find List with id: " + req.body.listId);
      if (!list) return res.status(500).send("Could not find List with id: " + req.body.listId);
      li = list
      Location.findOne({_id: req.body.locationId}, function(err, location){
        if (err) return res.status(500).send("There was an error trying to find Location with id: " + req.body.locationId);
        if (!location) return res.status(500).send("Could not find Location with id: " + req.body.locationId);
        lo = location;
        ListItem.findOneAndUpdate({_id: req.body.id},
          {$set: {item: it, list: li, location: lo}},
          {new: true},
          function(err, listItem){
            if (err) return res.status(500).send('There was an error while updating the ListItem.');
            if (!listItem) return res.status(500).send("ListItem could not be found");
            res.status(200).send(listItem);
        });
      });
    });
  });
});

router.delete('/:id', function(req, res){
  ListItem.findOneAndRemove({_id: req.params.id}, function(err, listItem){
    if (err) return res.status(500).send("An error occured while trying to delete ListItem with id: " + req.params.id);
    if(!listItem) return res.status(404).send("Could not find ListItem with id: " + req.params.id);
    res.status(200).send("ListItem successfully deleted.");
  });
});

module.exports = router;
