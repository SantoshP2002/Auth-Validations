import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-center drop-shadow-lg"
      >
        Welcome to <span className="text-yellow-300">MyApp</span>
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg md:text-xl text-center max-w-xl"
      >
        A modern platform to register, login, and explore amazing features with
        smooth animations.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex gap-4 mt-8"
      >
        <Link
          to="/register"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-yellow-300 transition-all duration-300"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
          Login
        </Link>
      </motion.div>

      {/* Floating Shapes Animation */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute bottom-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-xl"
      ></motion.div>
    </div>
  );
}
