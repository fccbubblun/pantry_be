var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Item = require('./Item');

router.get('/', function(req, res){
  Item.find({}, function(err, items){
    if (err) return res.status(500).send("There was an error finding items: ");
    if (!items) return res.status(404).send("No Items were found");
    res.status(200).send(items);
  });
});

router.get('/:name', function(req, res){
  Item.findOne({name: req.params.name}, function(err, item){
    if (err) return res.status(500).send("Could not get item with name: " + req.params.name);
    if (!item) return res.status(404).send("Could not find item with name: " + req.params.name);
    res.status(200).send(item);
  });
});

router.post('/', function(req, res){
  Item.findOne({name: req.body.name}, function(err, item){
    if (err) return res.status(500).send('There was a problem querying the database.');
    if (item){
      return res.status(200).send('Item already exists.');
    } else {
        Item.create({
          name: req.body.name,
          category: req.body.category,
        },
        function(err, item){
          if (err) return res.status(500).send('There was a problem adding the item to the database.');
          res.status(200).send(item);
        }
      );
    }
  });
});

router.put('/', function(req, res){
  Item.findOneAndUpdate({name: req.body.name},
    {$set: {category: req.body.category}},
    {new: true},
    function(err, item){
      if (err) return res.status(500).send("Could not update item.");
      res.status(200).send(item);
  });
});

router.delete('/:name', function(req, res){
  Item.findOneAndRemove({name: req.params.name}, function(err, item){
    if (err) return res.status(500).send("Could not delete item with name: " + req.params.name);
    if(!item) return res.status(404).send("Could not find item with name: " + req.params.name);
    res.status(200).send("Item successfully deleted.");
  });
});

module.exports = router;
