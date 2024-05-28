import categoriesModel from "../models/categoriesModel.js";
import foodModel from "../models/foodModel.js";

export const findByIdAndUpdateTotalItems = async () => {
    const foodsCount = await foodModel.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    for (const count of foodsCount) {
      await categoriesModel.findByIdAndUpdate(count._id, { totalItems: count.count } );
    }
};

export const createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error("Incorrect data!");
        }

        await findByIdAndUpdateTotalItems();

        const data = {
            name: req.body.name,
            ...(req.file ? { image: req.file.filename } : {})
        }

        const newCategory = await categoriesModel(data);

        newCategory.save();

        res.json({ success:true, data: newCategory, message: "Category added successfully!" });
    } catch(error) {
        res.json({ success:false, message: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error("Incorrect data!");
        }

        await findByIdAndUpdateTotalItems();
        const category = await categoriesModel.findById(req.params.id);

        res.json({ success:true, category });
    } catch(error) {
        res.json({ success:false, message: error.message });
    }
};

export const getPageableCategories = async (req, res) => {
    try {
        await findByIdAndUpdateTotalItems();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = limit * (page - 1);
        const search = req.query.search;

        const pipeline = [
            {
                $match: {
                    name: { $regex: search, $options: "i" }
                }

            },
            {
                $facet: {
                    data: [ { $skip: skip }, { $limit: limit } ]
                }
            },
            {
                $project: {
                    _id: 0,
                    docs: "$data"
                }
            }
        ];
        const total = await categoriesModel.countDocuments({});
        const categories = await categoriesModel.aggregate(pipeline);

        res.json({ success:true, categories, currentPage: Number(page), totalPages: Math.ceil(total / limit) });
    } catch(error) {
        res.json({ success:false, message: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find({});

        res.json({ success:true, categories });
    } catch(error) {
        res.json({ success:false, message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error("Incorrect data!");
        }
        await findByIdAndUpdateTotalItems();
        const category = await categoriesModel.findByIdAndDelete(req.params.id);

        res.json({ success:true, category });
    } catch(error) {
        res.json({ success:false, message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        if (!req.params.id && !req.body.name) {
            throw new Error("Incorrect data!");
        }
        await findByIdAndUpdateTotalItems();
        const data = {
            name: req.body.name,
            ...(req.file ? { image: req.file.filename } : {})
        }
        console.log("CATEGORY UPDATE DATA++++++++++", data);
        const category = await categoriesModel.findByIdAndUpdate(req.params.id, data);

        res.json({ success: true, category });
    } catch(error) {
        res.json({ success: false,  message: error.message });
    }
};