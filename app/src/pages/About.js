import React from 'react';
import './About.css';
import Aboutpic from './pfp.png';
import dance from './dance.gif';
import bonnie from './bonnie.png';
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
      <img class="img" alt="photo of aleenah" src={dance} />
      <p> <strong>Aleenah Alam</strong> - Programmer <br></br> Aleenah is a Junior at Pace University pursuing 
      her BS in computer science. In her free time, she enjoys reading, photography, and spending time outdoors.</p> 

      <img class="img" alt="photo of michael" src={bonnie} />
      <p> <strong>Michael Carr</strong> - Programmer </p>

      <img class="img" alt="photo of lihi" src={Aboutpic} />
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
