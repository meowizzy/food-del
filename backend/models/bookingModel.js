import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required:true },
    table: { type: Number, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    seats: { type: Number, required: true },
    status: { type: String, default: "ACCEPTED"},
    items: { type: Array, required:true },
})

const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema);
export default bookingModel;