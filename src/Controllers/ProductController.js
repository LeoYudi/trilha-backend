const Product = require('../models/Product');
const Brand = require('../models/Brand');
const { deleteFile } = require('../utils/file');
const { hasNull } = require('../utils/hasNull');

module.exports = {
  async save(req, res) {
    if (!req.isAdmin) {
      if (req.file)
        deleteFile(req.file.key);
      return res.status(403).send({ msg: 'forbidden' });
    }

    if (hasNull(req.body, ['id_brand', 'name', 'price', 'category'])) {
      if (req.file)
        deleteFile(req.file.key);
      return res.status(400).send({ msg: 'missing required data' });
    }

    const { name, price, description, category, id_brand } = req.body;

    try {
      const brand = await Brand.findByPk(id_brand);

      if (!brand) {
        if (req.file)
          deleteFile(req.file.key);
        return res.status(404).send({ msg: 'not found' });
      }

      let product;
      if (req.file)
        product = await Product.create({
          name,
          price,
          description,
          image_uri: `http://localhost:5000/images/${req.file.key}`,
          category,
          id_brand
        });
      else
        product = await Product.create({ name, price, description, category, id_brand })


      return res.status(200).send(product)

    } catch (error) {
      if (req.file)
        deleteFile(req.file.key);
      console.log(error);
      return res.status(500).send({ msg: 'internal server error' });
    }

  },


  async list(req, res) {
    const result = await Product.findAll()

    return res.status(200).send(result)
  },


  async edit(req, res) {
    const { id_product } = req.params

    const { name, price, description, image_uri, category, id_brand } = req.body;

    const product = await Product.findByPk(id_product)

    const result = await product.update({ name, price, description, image_uri, category, id_brand })

    return res.status(200).send(result)
  },
  async delete(req, res) {
    const { id_product } = req.params

    const product = await Product.findByPk(id_product)

    const result = await product.destroy()

    return res.status(200).send(result)
  }
}