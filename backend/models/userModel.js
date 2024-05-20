import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    street: { type: String, required: false, unique: false },
    city: { type: String, required: false, unique: false },
    state: { type: String, required: false, unique: false },
    zipCode: { type: Number, required: false, unique: false },
    country: { type: String, required: false, unique: false },
    phone: { type: String, required: false, unique: false },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordResetTokenExpires: Date,
    cartData:{type:Object,default:{}},
    bookingData: Array
}, { minimize: false })

userSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 100;

    return resetToken;
}

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;