import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const registerSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  age: z.number("Age is required").min(10, "Age must be at least 10 years old"),
  email: z
    .string("Email is required")
    .email("Invalid Email Format")
    .toLowerCase(),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI as string}/api/auth/register`,
        data 
      );
      console.log("kaka",response.data);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error("User already exists please different Register.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-6 text-gray-800"
        >
          Register
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-10">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block font-semibold text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 p-3 rounded-lg outline-none transition-all"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Age */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block font-semibold text-gray-700">Age</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 p-3 rounded-lg outline-none transition-all"
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 p-3 rounded-lg outline-none transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 p-3 rounded-lg outline-none transition-all"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 rounded-lg font-semibold shadow-lg"
          >
            Register
          </motion.button>

          {/* Login Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-4 text-gray-600"
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </a>
          </motion.p>
        </form>
        <div className="fixed bottom-4 right-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Go Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
