var express = require('express');
var app = express();
var db = require('./db');
var itemController = require('./item/ItemController');
var locationController = require('./location/LocationController');
var listController = require('./list/ListController');
var listItemController = require('./list_item/ListItemController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/item', itemController);
app.use('/location', locationController);
app.use('/list', listController);
app.use('/listItem', listItemController);

module.exports = app;
