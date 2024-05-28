import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        res.json({success: false,message: "Error"})
    }
}

export const resetPassword = async (req, res ) => {
    const token = crypto.createHash("sha256").update(req.body.token).digest('hex');
    const user = await userModel.findOne({ passwordResetToken: token });

    if (!user) {
        return res.json({success: false, message: "Token is invalid or has expired!"});
    }

    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();

    user.save();

    return res.json({success: true, message: "Your password successfully changed."});
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({email});
    
    try {
        if(!user){
            res.json({success:false, message: "User email address not found"});
        }

        const resetToken = user.createResetPasswordToken();

        await user.save();

        const resetUrl = `${req.get('origin')}/passwordReset/${resetToken}`;
        const message = `We have received a password reset request. Please use the bellow link to reset your password.\n\n${resetUrl}`;
        
        await sendEmail({
            email: user.email,
            subject: 'Password change request received.',
            message
        });
        
        res.status(200).json({success:true,message:"Password change request received."});
    } catch(e) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save();
        console.log(e)
        res.json({success:false,message:"There was an error sending password reset email. Please try again later."});
    }
};

const profile = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ success: false, message: "Token is invalid or has expired" });
    }
    
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await userModel.findOne({ _id: id });

        const data = {
            id: user._id, 
            email: user.email, 
            name: user.name,
            street: user.street,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            country: user.country,
            phone: user.phone
        }

        return res.json({ success: true , data });
    } catch(e) {

        return res.json({ success: false , message: "Error occured" } );
    }
}

const profileUpdate = async (req, res) => {
    const token = req.params.token;
    const { name, email, phone, street, city, state, zipCode, country } = req.body;

    if (!token) {
        return res.json({ success: false, message: "Token is invalid or has expired" });
    }

    if (!name && !email) {
        return res.json({ success: false, message: "Name and email are required" });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await userModel.findOne({ _id: id });

        if (!user) {
            return res.json({ success: false, message: "User with this id is not found" });
        }

        const exists = await userModel.findOne({ email });
    
        if(exists && exists.email && user.email !== exists.email){
            return res.json({success:false,message: "This email address is already in use"});
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.street = street;
        user.city = city;
        user.state = state;
        user.zipCode = zipCode;
        user.country = country;

        user.save();

        const data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            street: user.street,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            country: user.country,
        }

        console.log(data);

        return res.json({ success: true , data });
    } catch(e) {

        console.log(e);

        return res.json({ success: false , message: e.message } );
    }
}

export { loginUser, registerUser, profile, profileUpdate }