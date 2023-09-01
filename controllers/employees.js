const { prisma } = require("../prisma/prisma-client");

const getAllEmployee = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        res.status(200).json(employees)
    } catch (err) {
        res.status(500).json({ message: 'Не вдалось завантажити працівників' })
    }
}

const getOneEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const employee = await prisma.employee.findUnique({
            where: { id }
        })
        res.status(200).json(employee)
    } catch (err) {
        res.status(500).json({ message: 'Не вдалось получити працівника' })
    }
}

const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, address, age } = req.body
        if(!firstName.trim() || !lastName.trim() || !address.trim() || !age.trim()) {
            return res.status(400).json({ message: 'Будь ласка, заповніть обов’язкові поля' })
        }
        const isEmployeeExist = await prisma.employee.findFirst({
            where: { firstName: firstName.trim(), lastName: lastName.trim() }
        })
        if(isEmployeeExist) {
            return res.status(400).json({ message: 'Такий працівник вже існує' })
        }
        const employee = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                address,
                age,
                userId: req.user.id
            }
        })
        return res.status(201).json(employee)
    } catch (err) {
        res.status(500).json({ message: 'Не вдалось створити працівника' })
    }
}

const removeEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const employee = await prisma.employee.delete({
            where: { id }
        })
        res.status(200).json({ message: 'Працівник успішно видалений', employee })
    } catch (err) {
        res.status(500).json({ message: 'Не вдалось видалити працівника' })
    }
}

const editEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        if(!data.firstName.trim() || !data.lastName.trim() || !data.age.trim() || !data.address.trim()) {
            return res.status(400).json({ message: 'Будь ласка, заповніть обов’язкові поля' })
        }
        const employee = await prisma.employee.update({
            where: { id },
            data
        })
        res.status(200).json(employee)
    } catch (err) {
        res.status(500).json({ message: 'Не вдалось внести зміни' })
    }
}

module.exports = {
    getAllEmployee,
    getOneEmployee,
    createEmployee,
    removeEmployee,
    editEmployee
}