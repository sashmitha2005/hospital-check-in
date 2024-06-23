import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-page">
      <div className="background-container">
        <div className="background-slider">
          <div className="slide" style={{ backgroundImage: 'url(https://thumbs.dreamstime.com/z/abstract-blurred-white-doctor-medical-office-room-background-concept-blur-empty-space-grey-modern-hospital-clinic-pharmacy-180237091.jpg)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-XUUNRptF9vz7aLSZCZNKAgaG9QPbzN_og&s)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_2zn5TCQCflGySUITcEt24-BuOQpdssKLEg&s)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg2OC1zYXNpLTA2LmpwZw.jpg)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(https://c1.wallpaperflare.com/preview/937/818/491/stethoscope-doctor-md-medical-health-hospital.jpg)' }}></div>
        </div>
      </div>
      <div className="content">
        <h1>About Us</h1>
        <p>Welcome to Health Manager, your trusted partner in managing your health and wellness. Our platform connects you with top healthcare professionals and facilities, ensuring you receive the best care possible.</p>
        <p>We are committed to providing a seamless and efficient experience for both patients and doctors. Whether you need to book an appointment, find a specialist, or access your medical records, Health Manager is here to help.</p>
        <p>Our mission is to make healthcare accessible and convenient for everyone. We believe in empowering individuals with the tools they need to take control of their health. Join us on this journey to better health and wellness.</p>
        <p>Thank you for choosing Health Manager. Your health is our priority.</p>
      </div>
    </div>
  );
}

export default About;
