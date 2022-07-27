const { Schema, model } = require('mongoose');

// Schema
const newSchema = new Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    code: {type: String, require: true},
    category: {type: String, require: true},
    images: [{ data: Buffer, contentType: String }]
})

// Model
module.exports = model('Product', newSchema);