const User = require('../models/User')

module.exports = {
    async save(req, res) {
        const {name, email, password, zip_code, cpf} = req.body;

        const result = await User.create({name, email, password, zip_code, cpf})

        return res.status(200).send(result)
    },
    async list(req,res) {
        const result = await User.findAll()

        return res.status(200).send(result)
    },
    async edit(req, res) {
        const {id_user} = req.params

        const {name, email, password, zip_code, cpf} = req.body;

        const user = await User.findByPk(id_user)

        const result = await user.update({name, email, password, zip_code, cpf})

        return res.status(200).send(result)
    },
    async delete(req, res) {
        const {id_user} = req.params

        const user = await User.findByPk(id_user)

        const result = await user.destroy()

        return res.status(200).send(result)
    }
}