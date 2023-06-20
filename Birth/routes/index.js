var express = require('express');
var router = express.Router();
const {Student, Department} = require('../models/test');

/* GET home page. */
router.get('/student', async (req, res) => {
  try{
    const student = await Student.find();
    res.status(200).json(student);
  }catch(e){
    res.status(404).json({message: e.message});
  }
});

router.post('/student', async (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    age: req.body.age
  });
  try{
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch(e){
    res.status(400).json({message: e.message})
  }
});
router.post('/department', async (req, res) => {
  const newDepartment = new Department({
    name: req.body.name,
    numberOfStudents: req.body.numberOfStudents,
    students: req.body.students
  });
  try{
    const department = await newDepartment.save();
    res.status(201).json(department);
  } catch(e){
    res.status(400).json({message: e.message})
  }
});

router.get('/students/:stud_id', getStudByID, async (req, res) => {
  try{
    const student = await Student.find();
    res.status(200).json(student);
  }catch(e){
    res.status(404).json({message: e.message});
  }
});

router.get('/students/:dep_id', getDepStudentIDs, getStudents, async (req, res) => {
  res.status(200).json(res.students);
});

async function getStudByID(stud_id){
  let student = await Student.findById(stud_id);
  return student;
}

async function getDepStudentIDs(req, res, next){
  let students;
  try{
    const dep = await Department.findById(req.params.dep_id);
    students = dep.students;
  }catch(err){
    res.status(404).json({message: err.message});
  }
  res.students = students;
  next();
}

async function getStudents(req, res, next){
  let students = [];
  res.students.forEach(student => {
    students.push(getStudByID(student));
  });
  res.students = students;
  next();
}

module.exports = router;
