var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var balanceSchema = new Schema({
  id: {type: ObjectId, required:true, unique: true},
  amount: {type: Number, required: true}
});

module.exports = mongoose.model('balance', balanceSchema);