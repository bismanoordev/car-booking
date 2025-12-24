import React from "react";
import { useFirebase } from "../context/FirebaseContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signupUser(data.email, data.password);
      toast.success(` Sign up successful! Welcome ${userCredential.user.email}`);
      reset();
    } catch (err) {
      toast.error(`error ${err.message}`);
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
        }}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            padding: "32px",
            width: "100%",
            maxWidth: "380px",
            borderRadius: "14px",
            boxShadow: "0 12px 30px rgba(255, 205, 3, 0.36)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0F1016",
              fontWeight: "700",
            }}
          >
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            autoComplete="off"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              color: "#0F1016",
            }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "4px" }}>
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            autoComplete="new-password"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
              color: "#0F1016",
            }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "4px" }}>
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#FFCC03",
              color: "#0F1016",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#757373ff",
            }}
          >
            Already have an account?{" "}
            <span style={{ color: "#FFCC03", cursor: "pointer" }}>Login</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
