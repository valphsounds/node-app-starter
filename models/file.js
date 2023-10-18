// dbfileobj - MongoDB File Object
const mongoose = require('mongoose');
const Joi = require('joi');

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String
    }
});

const File = mongoose.model('File', fileSchema);

function validateFile(file) {
    const schema = Joi.object({
        fileName: Joi.string().min(3).max(100).required(),
        fileUrl: Joi.string().min(3).max(250),
    })

    return schema.validate(file);
}

exports.File = File;
exports.validate = validateFile;
exports.fileSchema = fileSchema;