import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PartyDetail = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);

  useEffect(() => {
    // Fetch party details based on the party ID from the URL params
    axios.get(`http://localhost:9090/api/parties/${id}`)
      .then(response => {
        setParty(response.data);
      })
      .catch(error => {
        console.error('Error fetching party details:', error);
      });
  }, [id]); // Dependency on party ID from URL params

  return (
    <div>
      <h2>Party Details</h2>
      {party ? (
        <div>
          <p>Title: {party.title}</p>
          <p>Date: {party.partyDate}</p>
          {/* Add more party details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PartyDetail;
