import bookingModel from "../models/bookingModel.js";
import categoriesModel from "../models/categoriesModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";


export const dashboardController = async (req, res) => {
    try {
        const categoriesTotal = await categoriesModel.countDocuments({});
        const bookingsTotal = await bookingModel.countDocuments({});
        const foodsTotal = await foodModel.countDocuments({});
        const ordersTotal = await orderModel.countDocuments({});

        const dashBoard = {
            categoriesTotal,
            bookingsTotal,
            foodsTotal,
            ordersTotal
        };

        res.json({ success: true,  ...dashBoard });

    } catch(error) {
        res.json({ success: false, message: error.message });
    }
};