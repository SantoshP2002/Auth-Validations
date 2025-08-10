import { Request, Response } from "express";
import userModel from "../model/userSchema";
import bcrypt from "bcrypt";
import z from "zod";

const registerSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "Name must be at least 3 characters long"),
  age: z
    .number("Age must be a number")
    .min(10, "Age must be at least 10 years old"),
  email: z.email("Invalid Email Format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  //   surname:z.string().startsWith("kaku", "surname must start with kaku"),
  //   test:z.string().includes("baba", "test must include baba"),
  //   test: z.url("test must be a valid url"),
    //   datetime:z.iso.datetime("Provide a only date and time are both")
//   test : z.number().multipleOf(10)
});

const userRegister = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

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
    const { name, age, email, password } = result.data;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    // Hashing Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create A new User
    const newUser = new userModel({
      name,
      age,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("❌ DB connection error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default userRegister;
