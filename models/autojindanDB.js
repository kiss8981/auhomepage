var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({}, {collection: 'autojindanDB'});

module.exports = mongoose.model('autojindan', PostSchema);
