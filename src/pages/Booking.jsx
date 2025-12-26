import React from "react";
import { useFirebase } from "../context/FirebaseContext";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  pickupLocation: yup.string().required("Pickup location is required"),
  destination: yup.string().required("Destination is required"),
  pickupDate: yup.date().required("Pickup date is required"),
  hour: yup.number().required(),
  minute: yup.string().required(),
  ampm: yup.string().required(),
});

const AddNewBooking = () => {
  const { addBooking } = useFirebase();
  const navigate = useNavigate();
  const { id: carId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      pickupLocation: "",
      destination: "",
      pickupDate: "",
      hour: "1",
      minute: "00",
      ampm: "AM",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://bookify-29a0c-default-rtdb.firebaseio.com/formDataRecord.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const success = await addBooking({
        ...data,
        createdAt: new Date(),
      });

      if (res.ok) {
        toast.success("Booking saved to Firebase");
        reset();
      } else {
        toast.error("Booking not saved ");
      }
    } catch (err) {
      toast.error("Something went wrong ");
      console.error(err);
    }
  };

  const handleCancel = () => {
    if (carId) navigate(`/car/${carId}`);
    else navigate("/cards");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "clamp(16px, 5vw, 50px)", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#FFFFFF",
      fontFamily: "Arial, sans-serif",
    },

    card: {
      background: "#FFFFFF",
      padding: "clamp(20px, 5vw, 30px)", 
      borderRadius: "10px",
      width: "100%", 
      maxWidth: "420px", 
      boxShadow: "0 0 20px rgba(231, 198, 66, 0.66)",
    },

    label: {
      color: "#201f1fff",
      fontSize: "clamp(11px, 3vw, 12px)",
      marginBottom: "5px",
      display: "block",
      textAlign: "left",
    },

    input: {
      width: "100%", 
      padding: "12px",
      borderRadius: "5px",
      border: "none",
      marginBottom: "12px",
      background: "#f3f0f0ff",
      fontSize: "clamp(13px, 3.5vw, 14px)",
    },

    error: {
      color: "red",
      fontSize: "10px",
      marginBottom: "8px",
      display: "block",
    },

    row: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },

    select: {
      flex: "1 1 30%",
      minWidth: "80px",
      padding: "12px",
      borderRadius: "5px",
      background: "#f3f0f0ff",
      border: "none",
    },

    buttonRow: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "10px",
    },

    button: {
      flex: "1 1 48%", 
      padding: "14px",
      borderRadius: "5px",
      fontWeight: "bold",
      fontSize: "clamp(14px, 4vw, 16px)",
      cursor: "pointer",
    },

    submitButton: {
      background: "#FFCC03",
      border: "none",
    },

    cancelButton: {
      background: "#FFCC03",
      border: "none",
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.page}>
        <form style={styles.card} onSubmit={handleSubmit(onSubmit)}>
          <label style={styles.label}>NAME</label>
          <input
            style={styles.input}
            {...register("name")}
            placeholder="Enter your name"
          />
          {errors.name && (
            <span style={styles.error}>{errors.name.message}</span>
          )}

          <label style={styles.label}>EMAIL</label>
          <input
            style={styles.input}
            {...register("email")}
            placeholder="Enter your email"
            type="email"
          />
          {errors.email && (
            <span style={styles.error}>{errors.email.message}</span>
          )}

          <label style={styles.label}>PHONE</label>
          <input
            style={styles.input}
            {...register("phone")}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <span style={styles.error}>{errors.phone.message}</span>
          )}

          <label style={styles.label}>PICKUP LOCATION</label>
          <input
            style={styles.input}
            {...register("pickupLocation")}
            placeholder="Enter ZIP/Location"
          />
          {errors.pickupLocation && (
            <span style={styles.error}>{errors.pickupLocation.message}</span>
          )}

          <label style={styles.label}>DESTINATION</label>
          <input
            style={styles.input}
            {...register("destination")}
            placeholder="Enter ZIP/Location"
          />
          {errors.destination && (
            <span style={styles.error}>{errors.destination.message}</span>
          )}

          <label style={styles.label}>PICKUP DATE</label>
          <input style={styles.input} {...register("pickupDate")} type="date" />
          {errors.pickupDate && (
            <span style={styles.error}>{errors.pickupDate.message}</span>
          )}

          <div style={styles.row}>
            <select {...register("hour")} style={styles.select}>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select {...register("minute")} style={styles.select}>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>

            <select {...register("ampm")} style={styles.select}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <div style={styles.buttonRow}>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.submitButton }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "BOOK NOW"}
            </button>

            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={handleCancel}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBooking;
