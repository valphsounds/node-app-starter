// dbobj - MongoDB Object Model
// mgsm - Mongoose Schema Member
// mgreq - Moongoose Schema Required
// joism - JOI Schema Member
const mongoose = require('mongoose');
const Joi = require('joi');

const objectSchema = new mongoose.Schema({
    num: {
        type: Number,
        require: true
    },
    string: {
        type: String,
        require: true
    },
    bool: {
        type: Boolean,
        require: true
    },
});

const Object = mongoose.model('Object', objectSchema);

function validateObject(object) {
    const schema = Joi.object({
        num: Joi.number().required(),
        string: Joi.string().required(),
        bool: Joi.boolean().required()
    });

    return schema.validate(object);
}

exports.Object = Object;
exports.validate = validateObject;
exports.objectSchema = objectSchema;