import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: "#0F1016",
        margin: "clamp(12px, 4vw, 40px)",
        padding: "12px 24px",
        borderRadius: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          color: "#FFCC03",
          fontSize: "22px",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        Bookify
      </Link>

      {/* Desktop Menu */}
      {!isMobile && (
        <>
          <div style={{ display: "flex", gap: "40px" }}>
            {["Home", "Cards", "Profile"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                style={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#FFCC03")}
                onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
              >
                {item}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {["Login", "Sign Up"].map((btn) => (
              <Link
                key={btn}
                to={`/${btn.replace(" ", "").toLowerCase()}`}
                style={{
                  border: "1px solid #FFCC03",
                  color: "#FFFFFF",
                  padding: "6px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                {btn}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Mobile Menu Icon */}
      {isMobile && (
        <div
          onClick={() => setOpen(!open)}
          style={{
            fontSize: "26px",
            color: "#FFCC03",
            cursor: "pointer",
          }}
        >
          ☰
        </div>
      )}

      {/* Mobile Dropdown */}
      {isMobile && open && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            background: "#0F1016",
            borderRadius: "14px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          {["Home", "Cards", "Profile", "Login", "Sign Up"].map((item) => (
            <Link
              key={item}
              to={
                item === "Home"
                  ? "/"
                  : `/${item.replace(" ", "").toLowerCase()}`
              }
              onClick={() => setOpen(false)}
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
