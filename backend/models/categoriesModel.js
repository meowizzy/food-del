import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalItems: { type: Number, default: 0 }
})

const categoriesModel = mongoose.models.categories || mongoose.model("categories", categoriesSchema);

export default categoriesModel;