import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import { createOrder } from "../utils/paypal.js";

// Placing User Order for Frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        const deliveryCost = 0;
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const total = req.body.items.reduce((acc, curr) => {
            return acc + curr.price * curr.quantity;
        }, 0);

        ;

        const line_items = req.body.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            description: item?.description,
            unit_amount: {
                currency_code: process.env.CURRENCY,
                value: Number(item.price).toFixed(2)
            }
        }))

        line_items.push({
            name: "Delivery Charge",
            quantity: 1,
            unit_amount: {
                currency_code: process.env.CURRENCY,
                value: Number(deliveryCost).toFixed(2)
            }
        });

        console.log("TOTAL++++", line_items)

        const return_url = `http://localhost:5174/verify?success=true&orderId=${newOrder._id}`;
        const cancel_url = `http://localhost:5174/verify?success=false&orderId=${newOrder._id}`;
        const amount = {
            currency_code: process.env.CURRENCY,
            value: Number(total+deliveryCost).toFixed(2),
            breakdown: {
                item_total: {
                    currency_code: process.env.CURRENCY,
                    value: Number(total+deliveryCost).toFixed(2),
                }
            }
        }

        const data = await createOrder(line_items, amount, return_url, cancel_url);

        res.json({ success: true, approval_url: data });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const {orderId , success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

export { placeOrder, listOrders, userOrders, updateStatus ,verifyOrder }