import axios from "axios"
import { useState } from "react"
import AuthContext from "./Context/AuthContext";
import { useContext } from "react";

const Tile = ({ setDoctor, data, doctor, _id }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleDelete = async () => {
        const temp_obj = {
            id: _id
        }
        try {
            const res = await axios.delete('http://localhost:5000/delete',{
                data: temp_obj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                setDoctor(data.filter(data => data._id !== _id));
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="grid-item" key={doctor._id}>
                <div className="grid-item-content">
                    <h3>{doctor.name}</h3>
                    <p><strong>Specialist:</strong> {doctor.specialist}</p>
                    <p><strong>Available Time:</strong> {doctor.time}</p>
                    <p><strong>Hospital Name:</strong> {doctor.hname}</p>
                    <p><strong>Hospital Address:</strong> {doctor.haddress}</p>
                    <p><strong>Contact Number:</strong> {doctor.cnumber}</p>
                </div>
                {isAuthenticated && <button className='book-now-button' onClick={handleDelete}>Delete</button>}
                </div>
        </>
    )
}

export default Tile;