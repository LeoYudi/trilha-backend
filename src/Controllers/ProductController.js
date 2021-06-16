const Product = require('../models/Product')

module.exports = {
    async save(req, res) {
        const {name, price, description, image_uri, category, id_brand} = req.body;

        const result = await Product.create({name, price, description, image_uri, category, id_brand})

        return res.status(200).send(result)
    },
    async list(req,res) {
        const result = await Product.findAll()

        return res.status(200).send(result)
    },
    async edit(req, res) {
        const {id_product} = req.params

        const {name, price, description, image_uri, category, id_brand} = req.body;

        const product = await Product.findByPk(id_product)

        const result = await product.update({name, price, description, image_uri, category, id_brand})

        return res.status(200).send(result)
    },
    async delete(req, res) {
        const {id_product} = req.params

        const product = await Product.findByPk(id_product)

        const result = await product.destroy()

        return res.status(200).send(result)
    }
}