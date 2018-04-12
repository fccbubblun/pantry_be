var mongoose = require('mongoose');
var ListSchema = new mongoose.Schema({
  name: String,
});

mongoose.model('List', ListSchema);
module.exports = mongoose.model('List');
