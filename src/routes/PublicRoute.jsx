import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const PublicRoute = ({ children, restricted = false }) => {
  const { user, loading } = useFirebase(); 

  if (loading) return <div>Loading...</div>;

  if (user && restricted) {
    return <Navigate to="/cards" replace />; 
  }

  return children; 
};

export default PublicRoute;
