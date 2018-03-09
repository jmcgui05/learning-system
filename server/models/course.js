const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  "id": String,
  "name": String,
  "length": String,
  "subject": String
}, {
    timestamps: true
})

module.exports = mongoose.model('Course', courseSchema);
