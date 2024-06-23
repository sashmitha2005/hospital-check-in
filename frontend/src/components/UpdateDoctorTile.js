import React, { useState } from 'react';
import axios from 'axios';

const UpdateDoctorTile = ({ doctor, setDoctor }) => {
  const [name, setName] = useState(doctor.name);
  const [specialist, setSpecialist] = useState(doctor.specialist);
  const [time, setTime] = useState(doctor.time);
  const [hname, setHname] = useState(doctor.hname);
  const [haddress, setHaddress] = useState(doctor.haddress);
  const [cnumber, setCnumber] = useState(doctor.cnumber);

  const handleUpdate = async () => {
    const updatedDoctor = {
      name,
      specialist,
      time,
      hname,
      haddress,
      cnumber,
    };

    try {
      const res = await axios.put(`http://localhost:5000/update_doctor/${doctor._id}`, updatedDoctor, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (res.status === 200) {
       
        setName(updatedDoctor.name);
        setSpecialist(updatedDoctor.specialist);
        setTime(updatedDoctor.time);
        setHname(updatedDoctor.hname);
        setHaddress(updatedDoctor.haddress);
        setCnumber(updatedDoctor.cnumber);

        setDoctor(prevDoctorList =>
          prevDoctorList.map(d => d._id === doctor._id ? { ...d, ...updatedDoctor } : d)
        );
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/delete/${doctor._id}`);

      if (res.status === 200) {
        
        setDoctor(prevDoctorList =>
          prevDoctorList.filter(d => d._id !== doctor._id)
        );
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="grid-item" key={doctor._id}>
      <div className="grid-item-content">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
        <input type="text" value={hname} onChange={(e) => setHname(e.target.value)} />
        <input type="text" value={haddress} onChange={(e) => setHaddress(e.target.value)} />
        <input type="text" value={cnumber} onChange={(e) => setCnumber(e.target.value)} />
        <button className='book-now-button' onClick={handleUpdate}>Update</button>
        <button className='delete-button' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UpdateDoctorTile;
