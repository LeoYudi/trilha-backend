const Brand = require('../models/Brand')

module.exports = {
    async save(req, res) {
        const {name} = req.body;

        const result = await Brand.create({name})

        return res.status(200).send(result)
    },
    async list(req,res) {
        const result = await Brand.findAll()

        return res.status(200).send(result)
    },
    async edit(req, res) {
        const {id_brand} = req.params

        const {name} = req.body;

        const brand = await Brand.findByPk(id_brand)

        const result = await brand.update({name})

        return res.status(200).send(result)
    },
    async delete(req, res) {
        const {id_brand} = req.params

        const brand = await Brand.findByPk(id_brand)

        const result = await brand.destroy()

        return res.status(200).send(result)
    }
}