import React, { useState } from 'react';
import axios from 'axios';

const AddPartyForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send POST request to add a new party
    axios.post('YOUR_BACKEND_ADD_PARTY_ENDPOINT', { title, date })
      .then(response => {
        console.log('Party added successfully:', response.data);
        // Reset form fields
        setTitle('');
        setDate('');
      })
      .catch(error => {
        console.error('Error adding party:', error);
      });
  };

  return (
    <div>
      <h2>Add Party</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Party</button>
      </form>
    </div>
  );
};

export default AddPartyForm;
