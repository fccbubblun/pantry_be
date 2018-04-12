var mongoose = require('mongoose');
var Item = require('../item/Item');
var List = require('../list/List');
var Location = require('../location/Location');

var ListItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
});
mongoose.model('ListItem', ListItemSchema);
module.exports = mongoose.model('ListItem');
