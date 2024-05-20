import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

const getFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);

        if (!food) res.json({ success: false, message: "Not found" });

        res.json({ success: true, data: food });
    } catch(error) {
        res.json({ success: false, message: error.message });
    }
};

const updateFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);

        food.name = req.body.name ? req.body.name : food.name;
        food.category = req.body.category ? req.body.category : food.category;
        food.price = req.body.price ? req.body.price : food.price;
        food.description = req.body.description ? req.body.description : food.description;
        food.image = req.file ? req.file.filename : food.image;

        food.save();

        res.json({ success: true, data: food });

    } catch(error) {
        res.json({ success: false, message: error.message });
    } 
};

export { listFood, addFood, removeFood, updateFood, getFood };