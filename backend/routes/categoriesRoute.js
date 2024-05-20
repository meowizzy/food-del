import express from 'express';
import { createCategory } from "../controllers/categoriesController.js";
import { getCategoryById } from "../controllers/categoriesController.js";
import { getAllCategories } from "../controllers/categoriesController.js";
import { deleteCategory } from "../controllers/categoriesController.js";
import { updateCategory } from "../controllers/categoriesController.js";

const categoriesRoute = express.Router();

categoriesRoute.post("/create", createCategory);
categoriesRoute.get("/list/:id", getCategoryById);
categoriesRoute.get("/list", getAllCategories);
categoriesRoute.delete("/list/:id", deleteCategory);
categoriesRoute.patch("/update", updateCategory);

export default categoriesRoute;