import { Request, Response } from "express";
import z from "zod";
import userModel from "../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
  email: z.email("Invalid Email Format").toLowerCase(),
  password: z
    .string("Password must be a string")
    .min(2, "Password must be at least 2 characters long"),
});

const loginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error?.issues;
      console.log(errors);

      const errorMessage = errors
        ?.map(
          (err, ind) =>
            `${errors.length > 1 ? `${ind + 1}. ` : ""}${err.message}`
        )
        .join(", ");
      return res.status(400).json({ message: errorMessage });
    }

    const { email, password } = result.data;

    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const matchPassword = bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: " password is Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUser;
