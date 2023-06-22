const mongoose = require('mongoose');

const PendingResidentSchema = new mongoose.Schema({
    type: String,
    requester: String,
    body: JSON
});

const PendingIDSchema = new mongoose.Schema({
    type: String,
    requester: String,
    body: JSON
});

const pendingResident = mongoose.model('PendingResident', PendingResidentSchema);
const pendingID  = mongoose.model('PendingID', PendingIDSchema);

module.exports = {pendingID, pendingResident};