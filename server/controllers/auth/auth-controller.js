import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register
export const register = async (req, res) => {
    console.log("Incoming Data:", req.body);
    const { userName, email, password } = req.body;

    try {
        if (!userName){return res.status(400).json({ success : false, message: "User Name is required" })};
        if (!email){return res.status(400).json({ success : false, message: "Email is required" })};
        if (!password){return res.status(400).json({ success : false, message: "Password is required" })};
        if(userName){
            const userNameExists = await User.findOne({userName});
            if (userNameExists) {
                return res.status(400).json({ success : false, message: "User Name already exists" });
            }
        }
        if(email){
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ success : false, message: "Email already exists" });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json({ 
            success : true,
            message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success : false,
            message: "Something went wrong" });
    }

}









// login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message: "Something went wrong" });
    }

}





// logout