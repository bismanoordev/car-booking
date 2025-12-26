import React from "react";
import { useFirebase } from "../context/FirebaseContext";
import Navbar from "../components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { auth } = useFirebase();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login Successful");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("email", { message: "User not found" });
        toast.error("User not found");
      } else if (error.code === "auth/wrong-password") {
        setError("password", { message: "Wrong password" });
        toast.error("Wrong password");
      } else if (error.code === "auth/invalid-email") {
        setError("email", { message: "Invalid email format" });
        toast.error("Invalid email format");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px", 
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "360px", 
            backgroundColor: "#FFFFFF",
            padding: "clamp(20px, 5vw, 30px)", 
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(168, 158, 21, 0.56)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "22px",
              color: "#0F1016",
              fontWeight: "700",
              fontSize: "clamp(20px, 5vw, 24px)", 
            }}
          >
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            style={{
              width: "93%",
              padding: "clamp(10px, 3vw, 12px)",
              marginBottom: "4px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "14px",
            }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "8px" }}>
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            style={{
              width: "93%",
              padding: "clamp(10px, 3vw, 12px)",
              marginBottom: "4px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "14px",
            }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "8px" }}>
              {errors.password.message}
            </p>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "clamp(10px, 3vw, 12px)",
              backgroundColor: "#FFCC03",
              color: "#0F1016",
              fontWeight: "600",
              fontSize: "clamp(14px, 4vw, 16px)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
