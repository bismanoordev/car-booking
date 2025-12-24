import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user, loading, logoutUser, updateUserProfile } = useFirebase();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) return navigate("/login"); 
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user, loading, navigate]);

  const handleSave = async () => {
    try {
      await updateUserProfile({ displayName: name, photoURL: photo });
      alert("Profile updated successfully ");
      setEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!user) return null;

  return (
    
   <div>
     <Navbar/>
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaArrowLeft onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />
          <FaEdit
            onClick={() => setEditing(!editing)}
            style={{ marginLeft: "auto", cursor: "pointer" }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <img
            src={photo || "https://i.pravatar.cc/150"}
            alt="profile"
            style={avatarStyle}
          />

          {editing && (
            <input
              placeholder="Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              style={inputStyle}
            />
          )}

          {editing ? (
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          ) : (
            <h3>{user.displayName || "User"}</h3>
          )}
        </div>

        <Input label="Email" value={user.email} />

        {editing && (
          <button style={saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        )}

        <button style={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
   </div>
    
  );
}

function Input({ label, value }) {
  return (
    <div style={{ marginTop: "12px" }}>
      <label style={{ fontSize: "13px", color: "#777" }}>{label}</label>
      <input value={value} disabled style={inputStyle} />
    </div>
  );
}

/* -------- Styles -------- */
const pageStyle = {
  minHeight: "100vh",
  // top:"0px",
  // background: "#F6F6F6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: "360px",
  background: "#fff",
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const avatarStyle = { width: "90px", height: "90px", borderRadius: "50%" };
const inputStyle = { width: "93%", padding: "10px", marginTop: "6px", borderRadius: "10px", border: "1px solid #ddd" };
const saveBtn = { width: "100%", background: "#FFCC03", border: "none", padding: "12px", borderRadius: "30px", fontWeight: "bold", cursor: "pointer", marginTop: "15px" };
const logoutBtn = { ...saveBtn, background: "#eee" };
