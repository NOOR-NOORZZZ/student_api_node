const Joi = require('joi');
const { logRequest } = require('../utility/logger'); 

// Schema for adding a student (all fields required)
const studentSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Phone number must be a 10-digit numeric value.'
    }),
    date_of_birth: Joi.date().iso().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    address: Joi.string().min(5).required(),
    enrollment_number: Joi.string().min(5).max(20).required(),
    department: Joi.string().min(3).max(100).required(),
    guardian_name: Joi.string().min(3).max(100).required(),
    guardian_contact: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Guardian contact must be a 10-digit numeric value.'
    }),
    admission_date: Joi.date().iso().required(),
    status: Joi.string().valid('Active', 'Inactive').required(),
    profile_photo: Joi.string().min(3).max(100).required()
});

// Schema for updating a student (all fields optional)
const updateStudentSchema = studentSchema.fork(Object.keys(studentSchema.describe().keys), (schema) => schema.optional());

// Validate request body for adding a student
const validateStudentAdd = (req, res, next) => {
    const { error } = studentSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.error("Validation Failed:", error.details.map(err => err.message)); 
        logRequest(req, 400, req.body, { message: "Validation Failed", errors: error.details.map(err => err.message) });
        return res.status(400).json({ message: "Validation Failed", errors: error.details.map(err => err.message) });
    }

    next(); 
};

// Validate request body for updating a student
const validateStudentUpdate = (req, res, next) => {
    const { error } = updateStudentSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.error("Validation Failed:", error.details.map(err => err.message)); 
        logRequest(req, 400, req.body, { message: "Validation Failed", errors: error.details.map(err => err.message) });
        return res.status(400).json({ message: "Validation Failed", errors: error.details.map(err => err.message) });
    }

    next(); 
};

module.exports = { validateStudentAdd, validateStudentUpdate };
