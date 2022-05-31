const ProductModel = require('../models/Schema');

exports.addProduct = async (req, res) => {
    try {
        const { title, price, description, img } = req.body;
        if (!(title && price && description && img)) {
            console.log("Check")
            return res.status(400).send("All input is required");
        }
        const product = { ...req.body };
        const data = await new ProductModel(product).save();
        return res.status(200).send({ data: data });
    } catch (err) {
        console.log(err);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({ body: req.body.title });
        return res.status(200).send({ data: products })
    }
    catch (err) {
        console.log(err)
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await ProductModel.findOneAndUpdate({
            _id: id
        }, req.body
        )
        if (product) {
            return res.status(200).send({ data: product });
        }
    } catch (err) {
        console.log(err);
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await ProductModel.findOneAndDelete({
            _id: id
        })
        if (product) {
            return res.status(200).send({ data: product });
        }
    } catch (err) {
        console.log(err);
    }
}