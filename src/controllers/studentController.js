const studentModel = require('../models/studentModel'); 
const { logRequest } = require('../../utility/logger'); 

// Fetch all students
exports.getStudents = async (req, res) => {
    try {
        const students = await studentModel.spGetStudents();
        
        logRequest(req, 200, req.body, { message: 'Students fetched successfully', data: students });
        res.json({ message: 'Students fetched successfully', data: students });
    } catch (error) {
        console.error('Error fetching students:', error);
        logRequest(req, 500, req.body, { message: 'Internal Server Error', error: error.message });
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Fetch student by ID
exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            logRequest(req, 400, req.body, { message: 'Student ID is required' });
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const student = await studentModel.spGetStudentById(studentId);
        
        if (!student) {
            logRequest(req, 404, req.body, { message: `Student with ID ${studentId} not found` });
            return res.status(404).json({ message: 'Student not found' });
        }

        logRequest(req, 200, req.body, { message: 'Student fetched successfully', data: student });
        res.json({ message: 'Student fetched successfully', data: student });
    } catch (error) {
        console.error(`Error fetching student with ID ${req.params.id}:`, error);
        logRequest(req, 500, req.body, { message: 'Internal Server Error', error: error.message });
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        const newStudent = await studentModel.spAddStudent(req.body);
        logRequest(req, 201, req.body, { message: 'Student added successfully', data: newStudent });
        res.status(201).json({ message: 'Student added successfully', data: newStudent });
    } catch (error) {
        console.error('Error adding student:', error);
        logRequest(req, 500, req.body, { message: 'Internal Server Error', error: error.message });
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updatedStudent = await studentModel.spUpdateStudent(studentId, req.body);

        if (!updatedStudent) {
            logRequest(req, 404, { studentId }, { message: "Student not found or not updated" });
            return res.status(404).json({ message: 'Student not found or not updated' });
        }

        logRequest(req, 200, req.body, { message: 'Student updated successfully', data: updatedStudent });
        res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
    } catch (error) {
        console.error('Error updating student:', error);
        logRequest(req, 500, req.body, { message: 'Internal Server Error', error: error.message });
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Fetch student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await studentModel.spDeleteStudent(id);

        if (!deletedStudent) {
            logRequest(req, 404, { id }, { message: "Student not found" });
            return res.status(404).json({ message: "Student not found" });
        }

        logRequest(req, 200, { id }, { message: "Student deleted successfully" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        logRequest(req, 500, { id: req.params.id }, { message: "Internal Server Error", error: error.message });
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};