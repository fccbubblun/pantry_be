//var Location = require('../location/Location');
var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  // location: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Location'
  // },
});

mongoose.model('Item', ItemSchema);
module.exports = mongoose.model('Item');
