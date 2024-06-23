import React, { useState } from 'react';
import './Search.css'; 

const Search = ({ doctorData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [preferredTime, setPreferredTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredDoctors([]);
    } else {
      const filtered = doctorData.filter(doctor =>
        (doctor.name && doctor.name.toLowerCase().includes(query)) ||
        (doctor.specialist && doctor.specialist.toLowerCase().includes(query)) ||
        (doctor.hname && doctor.hname.toLowerCase().includes(query))
      );
      setFilteredDoctors(filtered);
    }
  };

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Booking appointment with ${selectedDoctor.name}`);
    console.log(`Preferred Time: ${preferredTime}`);
    console.log(`Description: ${description}`);
    setPreferredTime('');
    setDescription('');
    setSelectedDoctor(null);
  };

  return (
    <div className="search-page">
      <div className="content">
        <h1>Search Doctors</h1>
        <input
          type="text"
          placeholder="Search by name, specialty, or hospital"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="results">
          {(searchQuery.length === 0 || filteredDoctors.length === 0 ? doctorData : filteredDoctors).map((doctor, index) => (
            <div className="result-item" key={index}>
              <h3>{doctor.name}</h3>
              <p><strong>Specialist:</strong> {doctor.specialist}</p>
              <p><strong>Available Time:</strong> {doctor.time}</p>
              <p><strong>Hospital Name:</strong> {doctor.hname}</p>
              <p><strong>Hospital Address:</strong> {doctor.haddress}</p>
              <p><strong>Contact Number:</strong> {doctor.cnumber}</p>
              <button className="book-now-button" onClick={() => handleBookNow(doctor)}>Book Now</button>
            </div>
          ))}
        </div>

        {selectedDoctor && (
          <div className="booking-form">
            <h2>Book an Appointment with {selectedDoctor.name}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Preferred Time:
                <input
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setSelectedDoctor(null)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
