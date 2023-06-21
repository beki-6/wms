const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    type: {type: String, require: true},
    requester: {type: mongoose.Schema.Types.ObjectId, require: true},
    body: {type: JSON, require: true}
});

module.exports = mongoose.model('Request', RequestSchema);