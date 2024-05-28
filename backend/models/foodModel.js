import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    category:{ type:String }
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;