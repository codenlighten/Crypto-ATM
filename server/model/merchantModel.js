var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var merchantSchema = new Schema({
  id: {type: Number, required:true, unique: true},
  name: {type: String, required: true}
});

module.exports = mongoose.model('merchant', merchantSchema);