const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); 
const { validateStudentAdd, validateStudentUpdate } = require('../../middlewares/validateStudent');

// Get all student
router.get('/students', (req, res) => {
    console.log("Request received for /students"); 
    studentController.getStudents(req, res);
});

// Get student by ID
router.get('/students/:id', (req, res) => {
    console.log(`Request received for /students/${req.params.id}`);
    studentController.getStudentById(req, res);
});

// Add a new student
router.post('/students', validateStudentAdd, (req, res) => {
    console.log("Request received for adding a student");
    studentController.addStudent(req, res);
});

// Update a student
router.put('/students/:id', validateStudentUpdate, (req, res) => {
    console.log("Request received for updating a student");
    studentController.updateStudent(req, res);
});

// Delete a student by ID
router.delete('/students/:id', (req, res) => {
    console.log("Request received for deleting a student");
    studentController.deleteStudent(req, res);
});

module.exports = router;