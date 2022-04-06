import Category from "./category.model.js";

export const categoryResBuilder = (success, data, error) => {
    return {
        success, data, error
    }
}

export const createCategory = (req, res) => {
    const category = req.body.category;
    if (!category) {
        res.status(400).json(categoryResBuilder(false, null, 'Category is required'))
    } else {
        Category.create({ category })
            .then((result) => res.status(200).json(categoryResBuilder(true, result, null)))
            .catch((err) => res.status(400).json(categoryResBuilder(false, null, err)))
    }
}

export const getCategory = (req, res) => {
    const id = req.params.id
    Category.findByPk(id)
        .then((category) => {
            if (category == null) {
                res.status(400).json(categoryResBuilder(false, null, `Category with id ${id} does not exist`))
            } else {
                res.status(200).json(categoryResBuilder(true, category, null))
            }
        })
        .catch((err) => res.status(400).json(categoryResBuilder(false, null, err)))
}

export const getAllCategories = (req, res) => {
    Category.findAll({ raw: true })
        .then((data) => res.status(200).json(categoryResBuilder(true, data, null)))
        .catch((err) => res.status(400).json(categoryResBuilder(false, null, err)))
}