import React, { useState } from 'react';
import axios from 'axios';
import './AddPartyForm.css'; // Import CSS file for styling

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPartyData({ ...partyData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request to add a new party
    axios.post('http://localhost:9090/api/users/1/parties', partyData)
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
    <div className="form-container"> {/* Apply styling to this container */}
      <h2>Add Party</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={partyData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={partyData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip"
          value={partyData.zip}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="partyDate"
          value={partyData.partyDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={partyData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={partyData.endTime}
          onChange={handleChange}
          required
        />
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
  );
};

export default AddPartyForm;
