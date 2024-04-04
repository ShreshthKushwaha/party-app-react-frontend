import React, { useState } from 'react';
import axios from 'axios';
import './AddPartyForm.css'; // Import CSS file for styling
import { useSelector } from 'react-redux';
import Header from '../../appComponents/headers/Header';

const AddPartyForm = () => {
  const [partyData, setPartyData] = useState({
    title: '',
    address: '',
    zip: '',
    partyDate: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const userId = useSelector((state) => state.auth.userId);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPartyData({ ...partyData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request to add a new party
    axios.post(`http://localhost:9090/api/users/${userId}/parties`, partyData)
      .then(response => {
      console.log('Party added successfully:', response.data);
      // Reset form fields
      setPartyData({
        title: '',
        address: '',
        zip: '',
        partyDate: '',
        startTime: '',
        endTime: '',
        description: ''
      });
      })
      .catch(error => {
      console.error('Error adding party:', error);
      });
  };

  return (
    <div>
      <Header title='Add Party' home={false}></Header>
      <div className="form-container"> {/* Apply styling to this container */}
      
      <form onSubmit={handleSubmit}>
        <h4> Party Title</h4>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={partyData.title}
          onChange={handleChange}
          required
        />
         <h4> Address </h4>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={partyData.address}
          onChange={handleChange}
          required
        />
         <h4> ZIP code </h4>
        <input
          type="text"
          name="zip"
          placeholder="Zip"
          value={partyData.zip}
          onChange={handleChange}
          required
        />
          <h4> Date of the party </h4>
        <input
          type="date"
          name="partyDate"
          value={partyData.partyDate}
          onChange={handleChange}
          required
        />
          <h4> Start time </h4>
        <input
          type="time"
          name="startTime"
          value={partyData.startTime}
          onChange={handleChange}
          required
        />
          <h4> End time </h4>
        <input
          type="time"
          name="endTime"
          value={partyData.endTime}
          onChange={handleChange}
          required
        />
          <h4> Write a cool description of the party </h4>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={partyData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Party</button>
      </form>
    </div>
    </div>
    
  );
};

export default AddPartyForm;
