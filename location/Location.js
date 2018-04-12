var mongoose = require('mongoose')
var LocationSchema = new mongoose.Schema({
  name: String,
  address: String,
});

mongoose.model('Location', LocationSchema);
module.exports = mongoose.model('Location');
