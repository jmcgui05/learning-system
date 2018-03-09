const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  "id": Number,
  "name": String,
  "length": Number,
  "subject": String
}, {
    timestamps: true
})

module.exports = mongoose.model('Course', courseSchema);
