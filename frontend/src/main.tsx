import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Register } from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login.tsx";
import { ToastContainer } from "react-toastify";
// import Login from "./Pages/Login.tsx";
// import { Register } from "./Pages/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <ToastContainer position="top-center"/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
    <App />
  </StrictMode>
);
