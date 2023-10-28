import React from 'react';
import './About.css';
import Aboutpic from './pfp.png';
import dance from './dance.gif';

const About = () => {
  return (
    <div className="about-page">
        <div className="center">
            <h1>About Us</h1>
            <p>
                Welcome to TuneTalk!
            </p>
        </div>
    <br></br>

      <h2>Our Mission</h2>
      <p>
        Our mission is to share our love of music. We strive to have our platform be 
        a community space where music lovers can connect.
      </p>
      <br></br>

      <h2>Meet the Team</h2>
      <img src={dance} />
      <p> <strong>Aleenah Alam</strong> - Programmer <br/>  </p> 

      <img src={Aboutpic} />
      <p> <strong>Michael Carr</strong> - Programmer </p>

      <img src={Aboutpic} />
      <p> <strong>Lihi Shamriz</strong> - Programmer </p>
      <br></br>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to get in touch with us, please
        don't hesitate to contact us at _____.
      </p>
    </div>
  );
};

export default About;
