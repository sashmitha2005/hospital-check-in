import React, { useState } from 'react';
import axios from 'axios';
import Tile from './Tile'; 
import './Home.css';

const Home = ({ doctorData, setDoctor }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [bookingTime, setBookingTime] = useState('');
  const [bookingProblem, setBookingProblem] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [doctorName, setDoctorName] = useState('');

  const handleBookNow = (doctor) => {
    setBookingDoctor(doctor);
    setShowBookingForm(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowBookingForm(false);
    setBookingSuccess(true);

    console.log("Booking submitted:", {
      doctorName,
      bookingTime,
      bookingProblem
    });

    setDoctorName('');
    setBookingTime('');
    setBookingProblem('');
  };

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/delete/${_id}`);
      if (res.status === 200) {
        setDoctor(doctorData.filter(doctor => doctor._id !== _id));
      }
    } catch (err) {
      console.error('Error deleting doctor:', err);
    }
  };

  return (
    <div className="page">
      <div className="background-image home-bg">
        <img src="https://img.freepik.com/premium-photo/blur-short-white-hospital-walkway-background_7180-2422.jpg" alt="Hospital background" />
      </div>
      <div className="content">
        <h1>Welcome to Our Website</h1>
        {bookingSuccess && <p className="success-message">Booked Successfully!</p>}
        <div className="content-scroll">
          {doctorData.map((doctor) => (
            <div key={doctor._id} className="doctor-container">
              <Tile doctor={doctor} _id={doctor._id} data={doctorData} setDoctor={setDoctor} handleDelete={handleDelete} />
              <button className="book-now-button" onClick={() => handleBookNow(doctor)}>Book Now</button>
            </div>
          ))}
        </div>
        {showBookingForm && bookingDoctor && (
          <div className="booking-form">
            <h2>Book an Appointment</h2>
            <form onSubmit={handleBookingSubmit}>
              <input
                type="text"
                placeholder="Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Preferred Time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                required
              />
              <textarea
                placeholder="Describe your problem"
                value={bookingProblem}
                onChange={(e) => setBookingProblem(e.target.value)}
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
