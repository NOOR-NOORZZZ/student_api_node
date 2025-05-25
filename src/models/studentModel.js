const db = require('../../config/db'); 

// Execute stored procedure to get a students
const spGetStudents = async () => {
    try {
        const [students] = await db.promise().query('CALL sp_get_all_students()');
        return students[0]; 
    } catch (error) {
        throw error; 
    }
};

// Execute stored procedure to get a student by ID
const spGetStudentById = async (studentId) => {
    try {
        const [student] = await db.promise().query('CALL sp_get_student_by_id(?)', [studentId]);
        return student[0] || null;  
    } catch (error) {
        throw error;
    }
};

// Execute stored procedure to add a student
const spAddStudent = async (studentData) => {
    try {
        const [result] = await db.promise().query(
            'CALL sp_add_student(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                studentData.first_name, studentData.last_name, studentData.email, studentData.phone_number,
                studentData.date_of_birth, studentData.gender, studentData.address, studentData.enrollment_number,
                studentData.department, studentData.guardian_name, studentData.guardian_contact,
                studentData.admission_date, studentData.status, studentData.profile_photo
            ]
        );

        return result[0]?.[0] || null;  
    } catch (error) {
        throw error;
    }
};

// Execute stored procedure to update a student by ID
const spUpdateStudent = async (studentId, studentData) => {
    try {
        const [result] = await db.promise().query(
            'CALL sp_update_student(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                studentId, studentData.first_name, studentData.last_name, studentData.email, 
                studentData.phone_number, studentData.date_of_birth, studentData.gender, 
                studentData.address, studentData.enrollment_number, studentData.department, 
                studentData.guardian_name, studentData.guardian_contact, studentData.admission_date, 
                studentData.status, studentData.profile_photo
            ]
        );

        return result[0]?.[0] || null;  
    } catch (error) {
        throw error;
    }
};

// Execute stored procedure to delete a student by ID
const spDeleteStudent = async (studentId) => {
    try {
        const [result] = await db.promise().query('CALL sp_delete_student(?)', [studentId]);
        return result.affectedRows > 0;  
    } catch (error) {
        throw error;
    }
};
module.exports = { spGetStudents, spGetStudentById, spAddStudent, spUpdateStudent, spDeleteStudent };
