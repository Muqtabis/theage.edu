import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./LandingPage.css"; // Import the CSS
import logo from "../assets/theagelogo.jpg"; // Import the logo

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <img src={logo} alt="TheAgeSchool Logo" className="school-logo" />
        <h1>Welcome to</h1>
        <h1>THE AGE SCHOOL</h1>
        <p> ~Educational institute of Pre, Primary, and Secondary education</p>
        
        {/* Use Link instead of <a> for internal routing */}
        <Link to="/home" className="enter-btn">
          Enter
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;