var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  id: {type: Number, required:true, unique: true},
  name: {type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);