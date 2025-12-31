import React from "react";
import Navbar from "../components/Navbar";
import "../style/style.css";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="home">
        <div className="headings">
          <h1>Make Your Trip Enjoyable</h1>
          <h3>
            It's a never ending battle of making your cars batter and also
            trying to be better yourself
          </h3>
          <div className="btn">
            <Link to="/signup">
              <button className="signup">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
