import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#0F1016",
        margin: "40px 60px",
        padding: "12px 50px",
        borderRadius: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left side: Brand + Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "50px",
        }}
      >
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

        <Link
          to="/"
          style={{
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFCC03")}
          onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
        >
          Home
        </Link>

        <Link
          to="/cards"
          style={{
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "500",
             transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFCC03")}
          onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
        >
          Cards
        </Link>

        <Link
          to="/profile"
          style={{
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "500",
             transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FFCC03")}
          onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
        >
          Profile
        </Link>
      </div>

      {/* Right side: Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Link
          to="/login"
          style={{
            border: "1px solid #FFCC03",
            color: "#FFFFFF",
            padding: "6px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
             transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFCC03")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0F1016")}
        >
          Login
        </Link>

        <Link
          to="/signup"
          style={{
            border: "1px solid #FFCC03",
            color: "#FFFFFF",
            padding: "6px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
             transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFCC03")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#0F1016")}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
