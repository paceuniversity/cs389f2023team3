import React from 'react';
import '../App.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        Welcome to TuneTalk!
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to share our love of music. We strive to have our platform be 
        a community space where music lovers can connect.
      </p>
      <h2>Meet the Team</h2>
      <ul>
        <li>
          <strong>Aleenah Alam</strong> - Programmer
        </li>
        <li>
          <strong>Michael Carr</strong> - Programmer
        </li>
        <li>
          <strong>Lihi Shamriz</strong> - Programmer
        </li>
      </ul>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to get in touch with us, please
        don't hesitate to contact us at _____.
      </p>
    </div>
  );
};

export default About;
