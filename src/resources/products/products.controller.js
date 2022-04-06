import Product from "./products.model.js";

export const productResBuilder = (success, data, error) => {
    return {
        success, data, error
    }
}

export const createProd = (req, res) => {
    const prodName = req.body.product;
    const price = req.body.price;
    if (!prodName || !price) {
        res.status(400).json(productResBuilder(false, null, 'product or price field is required'));
    } else {
        Product.create({ product: prodName, price })
            .then((product) => res.status(200).json(productResBuilder(true, product, null)))
            .catch((err) => res.status(400).json(productResBuilder(false, null, err)))
    }
}

export const getAllProducts = (req, res) => {
    Product.findAll({ raw: true })
        .then((data) => res.status(200).json(productResBuilder(true, data, null)))
        .catch((err) => res.status(400).json(productResBuilder(false, null, err)))
}

export const getProduct = (req, res) => {
    const id = req.params.id
    Product.findByPk(id)
        .then((product) => {
            console.log('product from getProduct', product)
            if (product == null) {
                res.status(400).json(productResBuilder(false, null, `Product with id ${id} does not exist`))
            } else {
                res.status(200).json(productResBuilder(true, product, null))
            }
        })
        .catch((err) => res.status(400).json(productResBuilder(false, null, err)))
}