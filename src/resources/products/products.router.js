// const { Router } = require("express");
import { Router } from "express";
import { createProd, getAllProducts, getProduct } from "./products.controller.js";

const router = Router();

// router.all("/", (req, res) => res.json({ message: "Hello" }));
router.route('/')
    .post(createProd)
    .get(getAllProducts)

router.route('/:id')
    .get(getProduct)

export default router;
