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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success(" Login Successful");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("email", { message: "User not found" });
        toast.error(" User not found");
      } else if (error.code === "auth/wrong-password") {
        setError("password", { message: "Wrong password" });
        toast.error(" Wrong password");
      } else if (error.code === "auth/invalid-email") {
        setError("email", { message: "Invalid email format" });
        toast.error(" Invalid email format");
      } else {
        toast.error(" error" + error.message);
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
        }}
      >
        <div
          style={{
            width: "360px",
            backgroundColor: "#FFFFFF",
            padding: "30px",
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(168, 158, 21, 0.56)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#0F1016",
              fontWeight: "700",
            }}
          >
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            autoComplete="off"
            style={{
              width: "90%",
              padding: "12px",
              marginBottom: "4px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
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
            autoComplete="new-password"
            style={{
              width: "90%",
              padding: "12px",
              marginBottom: "4px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
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
              width: "98%",
              padding: "12px",
              backgroundColor: "#FFCC03",
              color: "#0F1016",
              fontWeight: "600",
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
