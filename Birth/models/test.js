const mongoose = require('mongoose');
const db = require('./db');

const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const DepartmentSchema = new mongoose.Schema({
    name: String,
    numberOfStudents: Number,
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
});

const Student = mongoose.model('Student', StudentSchema);
const Department = mongoose.model('Department', DepartmentSchema);

module.exports = {Student, Department}