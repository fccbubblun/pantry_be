var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Location = require('./Location');

router.get('/:name', function(req, res){
  Location.findOne({name: req.params.name}, function(err, loc){
    if (err) return res.status(500).send("Could not find Location with name: " + req.params.name);
    if (!loc) return res.status(404).send("Location not found.");
    res.status(200).send(loc);
  });
});

router.post('/', function(req, res){
  Location.findOne({name: req.body.name}, function(err, loc){
    if (err) return res.status(500).send('There was a problem querying the database.');
    if (loc){
      return res.status(200).send('Location already exists.');
    } else {
        Location.create({
          name: req.body.name,
          address: req.body.address,
        },
        function(err, loc){
          if (err) return res.status(500).send('There was a problem adding the Location to the database.');
          res.status(200).send(loc);
        }
      );
    }
  });
});

router.put('/', function(req, res){
  Location.findOneAndUpdate({name: req.body.name},
    {$set: {address: req.body.address}},
    {new: true},
    function(err, loc){
      if (err) return res.status(500).send("Could not update Location.");
      res.status(200).send(loc);
  })
});

router.delete('/:name', function(req, res){
  Location.findOneAndRemove({name: req.params.name}, function(err, loc){
    if (err) return res.status(500).send("Could not delete Location with name: " + req.params.name);
    if (!loc) return res.status(404).send("Could not find Location with name: " + req.params.name);
    res.status(200).send("Location successfully deleted.");
  });
});

module.exports = router;
