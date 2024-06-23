import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import AuthContext from './Context/AuthContext';
import UpdateDoctorTile from './UpdateDoctorTile';

const Navbar = ({ setDoctorData, doctorData }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const doctorListRef = useRef(null);

  useEffect(() => {
    axios.post('http://localhost:5000/get_all_events')
      .then(response => {
        setDoctorData(response.data);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
      });
  }, []);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'user') {
      setIsAuthenticated(true);
      setIsLoggedIn(true);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const temp_obj = {
      name: e.target.dname.value,
      specialist: e.target.spec.value,
      time: e.target.avail.value,
      hname: e.target.hname.value,
      haddress: e.target.add.value,
      cnumber: e.target.contact.value
    };

    try {
      const res = await axios.post('http://localhost:5000/add_data', temp_obj, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        const temp_obj_2 = {
          _id: res.data._id,
          name: e.target.dname.value,
          specialist: e.target.spec.value,
          time: e.target.avail.value,
          hname: e.target.hname.value,
          haddress: e.target.add.value,
          cnumber: e.target.contact.value
        };
        setDoctorData([...doctorData, temp_obj_2]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleScrollDown = () => {
    if (doctorListRef.current) {
      doctorListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h2 className="navbar-heading">HOSPITAL CHECK-IN SYSTEM</h2>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/search">Search</Link></li>
          {!isLoggedIn ? (
            <li><button onClick={toggleLoginForm}>Login</button></li>
          ) : (
            <>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>

      {showLoginForm && !isLoggedIn && (
        <div className="login-form-container">
          <div className="login-form">
            <button className="close-button" onClick={closeLoginForm}>X</button>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="content-wrapper">
          <div className="doctor-details-form">
            <h3>Doctor Details</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" id="dname" placeholder="Doctor Name" />
              <input type="text" id="spec" placeholder="Specialist" />
              <input type="text" id="avail" placeholder="Available Time" />
              <input type="text" id="hname" placeholder="Hospital Name" />
              <input type="text" id="add" placeholder="Hospital Address" />
              <input type="text" id="contact" placeholder="Contact Number" />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="doctor-list-container">
            <h3>Doctor List</h3>
            <div className="doctor-list" ref={doctorListRef}>
              {doctorData.map(doctor => (
                <UpdateDoctorTile
                  key={doctor._id}
                  doctor={doctor}
                  setDoctor={setDoctorData}
                />
              ))}
            </div>
            <button className="scroll-down-button" onClick={handleScrollDown}>Scroll Down</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
