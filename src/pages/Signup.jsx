import React from "react";
import { useFirebase } from "../context/FirebaseContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const { signupUser } = useFirebase();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signupUser(data.email, data.password);
      toast.success(`Sign up successful! Welcome ${userCredential.user.email}`);
      reset();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          padding: "16px", 
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            maxWidth: "380px",
            padding: "clamp(20px, 5vw, 32px)", 
            borderRadius: "14px",
            boxShadow: "0 12px 30px rgba(255, 205, 3, 0.36)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#0F1016",
              fontSize: "clamp(20px, 5vw, 24px)", 
            }}
          >
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            style={{
              padding: "clamp(10px, 3vw, 12px)",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            style={{
              padding: "clamp(10px, 3vw, 12px)",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "clamp(10px, 3vw, 12px)",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#FFCC03",
              fontWeight: "700",
              fontSize: "clamp(14px, 4vw, 16px)", 
              cursor: "pointer",
            }}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "clamp(12px, 3.5vw, 13px)",
              color: "#757373",
            }}
          >
            Already have an account?{" "}
            <span style={{ color: "#FFCC03", cursor: "pointer" }}>
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
