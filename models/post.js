const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  topic: String,
  body: String,
  img: String,
  created_at: {type: Date, required: true, default: Date.now }

});

module.exports = mongoose.model('Post', PostSchema);
