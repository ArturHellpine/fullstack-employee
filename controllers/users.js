const { prisma } = require("../prisma/prisma-client");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).json({ message: 'Заповніть обов’язкові поля' })
        }
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if(!user) {
            return res.status(400).json({ message: 'Такого користувача не існує' })
        }
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password))
        const secret = process.env.JWT_SECRET
        if(user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        } else {
            return res.status(400).json({ message: 'Невірний логін або пароль' })
        }
    } catch {
        res.status(500).json({ message: 'Щось пішло не так..' })
    }
}

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if(!email.trim() || !password.trim() || !name.trim()) {
            return res.status(400).json({ message: 'Заповніть обов’язкові поля' })
        }
        const registeredUser = await prisma.user.findFirst({
            where: { email }
        })
        if(registeredUser) {
            return res.status(400).json({ message: 'Електронна адреса вже зареєстрована' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })
        const secret = process.env.JWT_SECRET
        if(user && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
            })
        } else {
            return res.status(400).json({ message: 'Не вдалось створити акаунт' })
        }
    } catch {
        res.status(500).json({ message: 'Щось пішло не так..' })
    }
}

const current = async (req, res) => {
    try {
        return res.json(req.user)
    } catch {
        res.status(500).json({ message: 'Щось пішло не так..' })
    }
}

module.exports = { login, register, current }