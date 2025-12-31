import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useFirebase } from "../context/FirebaseContext";

const AddCar = () => {
  const [formData, setFormData] = useState({
    availableTime: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const firebase = useFirebase();

  const navigate = useNavigate();
  const db = getFirestore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    firebase.handelCreateNewListing(
      formData.availableTime,
      formData.startTime,
      formData.endTime,
      formData.description
    );
    try {
      await addDoc(collection(db, "cars"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      toast.success("Car added successfully!");
      navigate("/"); // Home page par redirect
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add car!");
    }
  };

  const styles = {
    container: {
      background: "#FFFFFF",
      padding: "clamp(12px, 4vw, 20px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    formCard: {
      background: "#0F1016",
      padding: "clamp(16px, 4vw, 24px)",
      borderRadius: "14px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 12px 30px rgba(255, 204, 3, 0.36)",
      display: "flex",
      flexDirection: "column",
      gap: "clamp(10px, 3vw, 12px)",
    },
    input: {
      padding: "clamp(10px, 3vw, 12px)",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "clamp(13px, 3.5vw, 14px)",
      width: "90%",
      maxWidth: "380px",
      outline: "none",
    },
    textarea: {
      padding: "clamp(10px, 3vw, 12px)",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "clamp(13px, 3.5vw, 14px)",
      width: "90%",
      maxWidth: "380px",
      outline: "none",
      minHeight: "80px",
    },
    submitBtn: {
      backgroundColor: "#FFCC03",
      color: "#0F1016",
      padding: "clamp(10px, 3vw, 14px)",
      border: "none",
      borderRadius: "8px",
      fontWeight: "700",
      fontSize: "clamp(14px, 4vw, 16px)",
      cursor: "pointer",
      transition: "0.3s",
    },
    submitBtnHover: {
      backgroundColor: "#e6b800",
    },
    heading: {
      color: "#FFCC03",
      textAlign: "center",
      fontSize: "clamp(20px, 5vw, 24px)",
      fontWeight: "700",
      marginBottom: "12px",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Add New Car</h1>

          <input
            type="text"
            name="availableTime"
            placeholder="Available Time"
            value={formData.availableTime}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="startTime"
            placeholder="Start Time"
            value={formData.startTime}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="endTime"
            placeholder="End Time"
            value={formData.endTime}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.submitBtn}
            onClick={handleSubmit}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e6b800")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffcc00ff")}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCar;
