var mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userid: String,
    point: String,
    date: { type: Date, default: Date.now  }
}, {collection: 'AUpoint'});

module.exports = mongoose.model('aupoint', PostSchema);