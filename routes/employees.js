const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { getAllEmployee, getOneEmployee, createEmployee, removeEmployee, editEmployee } = require("../controllers/employees");

router.get('/', auth, getAllEmployee)
router.get('/:id', auth, getOneEmployee)
router.post('/add', auth, createEmployee)
router.delete('/remove/:id', auth, removeEmployee)
router.put('/edit/:id', auth, editEmployee)

module.exports = router