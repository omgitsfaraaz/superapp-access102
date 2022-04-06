// const { Router } = require("express");
import { Router } from "express";
import { createCategory, getAllCategories, getCategory } from "./category.controller.js";

const router = Router();

// router.all("/", (req, res) => res.json({ message: "Hello category" }));
router.route('/')
    .post(createCategory)
    .get(getAllCategories)

router.route('/:id')
    .get(getCategory)

export default router;
