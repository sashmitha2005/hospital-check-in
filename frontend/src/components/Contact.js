import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
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
        <h1>Contact Us</h1>
        <p>If you have any questions or need further information, please fill out the form below, and we will get back to you as soon as possible.</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
        {isSubmitted && <p className="confirmation-message">Message sent!</p>}
      </div>
    </div>
  );
}

export default Contact;
