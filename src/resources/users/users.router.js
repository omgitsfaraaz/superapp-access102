// const { Router } = require("express");
import { Router } from "express";
import { createUser, deleteUser, getUser, updateUser } from "./users.controller.js";

const router = Router();

// router.all("/", (req, res) => res.json({ message: "Hello user" }));
router.route('/')
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

export default router;
