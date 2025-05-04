import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const signUp = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        // Check if email already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exists" });
        }
  

        // Create a new user
        const newUser = await User.create({
            email,
            password,
            username
        });

        // Respond with success
        res
          .status(201)
          .json({ message: "User Created Successfully", data: {username:newUser.username,id:newUser.id} });

    } catch (error) {
        res.status(500).json({ message: error.message  });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // const user = await User.findOne({ email }).exec();
        const user = await User.findOne({
            $or: [
              { username: { $regex: new RegExp(`^${email}$`, "i") } },
              { email: { $regex: new RegExp(`^${email}$`, "i") } },
            ],
          })

        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }

        bcrypt.compare(password, user.password, function (error, result) {
            if (error) return res.status(500).json({ message: error.message });
            if (result == true) {
                const token = jwt.sign({ uId: user._id }, process.env.JWT_SECRET);
                // Respond with success
                res.status(200).json({ message: "User LoggedIn Successfully", data: {username:user.username, id: user.id, token}});
            }
            else if (result == false) {
                return res.status(404).json({ message: "Credientials are incorrect" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set expiry date to remove cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    res.status(200).json({ message: "Logout successful" });
};
