import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from '../middlewares/sendMail.js'
import TryCatch from '../middlewares/TryCatch.js'

export const register = TryCatch(async (req, res) => {
    const { email, name, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.status(400).json({
        message: "User Already exists.",
    })

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
        name,
        email,
        password: hashPassword
    };

    const otp = Math.floor(Math.random() * 100000);

    const activationToken = jwt.sign(
        {
            user,
            otp,
        },
        process.env.ActivationSecret,
        {
            expiresIn: "5m"
        }
    );

    const data = {
        name,
        otp
    };

    await sendMail(
        email,
        "E learning",
        data
    )

    res.status(200).json({
        message: "Otp send to email",
        activationToken
    });
})

export const verifyUser = TryCatch(async (req, res) => {
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(activationToken, process.env.ActivationSecret);

    if (!verify) return res.status(400).json({
        message: "Otp expired !"
    })

    if (verify.otp !== otp) return res.status(400).json({
        message: "Wrong Otp !"
    })

    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password: verify.user.password,
    })

    res.json({
        message: "User Registered !",
    })
})
