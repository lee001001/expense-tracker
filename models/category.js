const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  category: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Category', categorySchema)
