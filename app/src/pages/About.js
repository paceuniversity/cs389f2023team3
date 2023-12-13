import React from 'react';
import './About.css';
import aleenahPfp from '../resources/aleenah.jpg';
import michaelPfp from '../resources/michael.png';
import lihi from '../resources/lihi.png';

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
      <img alt="aleenah" src={aleenahPfp} />
      <p className='text'> <strong>Aleenah Alam</strong> - Programmer <br></br> Hello! I am a Junior at Pace University pursuing 
      my BS in computer science. In my free time, I enjoy reading, photography, and spending time outdoors.</p> 

      <img alt="michael" src={michaelPfp} />
      <p className='text'>  <strong>Michael Carr</strong> - Hello I am Michael Carr and I'm a Junior at Pace University! I am pursing my B.S. in computer science. Some hobbies of mine inclue playing the bass guitar, playing video games, and listening to music. </p>

      <img alt="lihi" src={lihi} />
      <p className='text'> <strong>Lihi Shamriz</strong> - Programmer
      <br></br>I'm an exchange student at Pace University, here for just one semester.
      <br></br>I live in Manhattan and enjoy exlporing new places and new music.</p>
      <br></br>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to get in touch with us, please
        don't hesitate to contact us <a className="link" href="https://github.com/paceuniversity/cs389f2023team3">here</a>.
      </p>
    </div>
  );
};

export default About;
