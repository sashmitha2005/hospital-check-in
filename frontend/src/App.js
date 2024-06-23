import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthProvider from './components/Context/AuthProvider';
import Contact from './components/Contact';
import About from './components/About';
import Search from './components/Search';
import './App.css';

const App = () => {
  const [doctorData, setDoctorData] = useState([]);

  return (
    <AuthProvider>
    <Router>
        <Navbar setDoctorData={setDoctorData} doctorData={doctorData} />
        <Routes>
          <Route path="/" element={<Home doctorData={doctorData} setDoctor={setDoctorData} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search doctorData={doctorData} />} />
        </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
