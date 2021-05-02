var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({}, {collection: 'warning'});

module.exports = mongoose.model('warning', PostSchema);
