import express from 'express';
import {createCategory, getAllCategories, getPageableCategories} from "../controllers/categoriesController.js";
import { getCategoryById } from "../controllers/categoriesController.js";
import { deleteCategory } from "../controllers/categoriesController.js";
import { updateCategory } from "../controllers/categoriesController.js";
import multer from "multer";

const categoriesRoute = express.Router();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

categoriesRoute.post("/create", upload.single('image'), createCategory);
categoriesRoute.get("/list/:id", getCategoryById);
categoriesRoute.get("/pageable-list", getPageableCategories);
categoriesRoute.get("/all", getAllCategories);
categoriesRoute.delete("/list/:id", deleteCategory);
categoriesRoute.put("/update", upload.single('image'), updateCategory);

export default categoriesRoute;