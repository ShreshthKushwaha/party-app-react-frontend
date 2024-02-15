import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartyList = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // Fetch list of parties from the backend API
    axios.get('http://localhost:9090/api/parties')
      .then(response => {
        setParties(response.data);
      })
      .catch(error => {
        console.error('Error fetching parties:', error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <div>
      <h2>Party List</h2>
      <ul>
        {parties.map(party => (
          <li key={party.id}>
            {party.title} - {party.partyDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartyList;
