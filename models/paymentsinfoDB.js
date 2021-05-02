var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    totalAmount: String,
    paymentKey: String,
    orderId: String,
    useage: String,
}, {collection: 'payments'});

module.exports = mongoose.model('payments', PostSchema);