var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var List = require('./List');
var ListItem = require('../list_item/ListItem');

router.get('/:name', function(req, res){
  var lst;
  List.findOne({name: req.params.name}, function(err, list){
    if (err) return res.status(500).send("There was an error trying to find List with name: " + req.params.name);
    if (!list) return res.status(500).send("Could not find List with name: " + req.params.name);
    lst = list
    ListItem.find({list: lst}, function(err, items){
      if (err) return res.status(500).send("There was an error finding items: ");
      if (!items) return res.status(404).send("No Items were found");
      res.status(200).send(items);
    });
  });
});

// router.get('/:name', function(req, res){
//   List.findOne({name: req.params.name}, function(err, list){
//     if (err) return res.status(500).send("Could not get List with name: " + req.params.name);
//     if (!list) return res.status(404).send("Could not find List with name: " + req.params.name);
//     res.status(200).send(list);
//   });
// });

router.post('/', function(req, res){
  List.findOne({name: req.body.name}, function(err, list){
    if (err) return res.status(500).send('There was a problem querying the database.');
    if (list){
      return res.status(200).send('List already exists.');
    } else {
        List.create({
          name: req.body.name,
        },
        function(err, list){
          if (err) return res.status(500).send('There was a problem adding the List to the database.');
          res.status(200).send(list);
        }
      );
    }
  });
});

router.put('/', function(req, res){
  List.findOneAndUpdate({name: req.body.name},
    {name: req.body.new_name},
    {new: true},
    function(err, list){
      if (err) return res.status(500).send("Could not update List.");
      res.status(200).send(list);
  });
});

router.delete('/:name', function(req, res){
  List.findOneAndRemove({name: req.params.name}, function(err, list){
    if (err) return res.status(500).send("Could not delete List with name: " + req.params.name);
    if(!list) return res.status(404).send("Could not find List with name: " + req.params.name);
    res.status(200).send("List successfully deleted.");
  });
});

module.exports = router;
