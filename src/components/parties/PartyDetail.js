import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RequestList from '../requests/RequestList';
import { useSelector } from 'react-redux';

const PartyDetail = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    // Fetch party details based on the party ID from the URL params
    axios.get(`http://localhost:9090/api/parties/${id}`)
      .then(response => {
        setParty(response.data);
        // Check if user has already sent a request for this party
        checkRequestStatus();
      })
      .catch(error => {
        console.error('Error fetching party details:', error);
      });
  }, [id]);




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

  const checkRequestStatus = () => {
    // Make an API call to fetch invitations for the party
    axios.get(`http://localhost:9090/api/${id}/invitations`)
      .then(response => {
        console.log('Invitations:', response.data);
        // Check if any invitation exists for the user
        const hasInvitation = response.data.some(invitation => invitation.userId === userId);
        setIsRequestSent(hasInvitation); // Set to true if invitation exists
      })
      .catch(error => {
        console.error('Error checking request status:', error);
      });
};


  const handleSendRequest = () => {
    // Make an API call to send the request
    axios.post(`http://localhost:9090/api/parties/${id}/invitations/${userId}`,{})
      .then(response => {
        setIsRequestSent(true); // Update state to indicate request is sent
      })
      .catch(error => {
        console.error('Error sending request invitation:', error);
      });
  };


  return (
    <div>
      <h2>Party Details</h2>
      {party ? (
        <div>
          <p>Title: {party.title}</p>
          <p>Date: {party.partyDate}</p>
          {/* Add more party details here */}
          {!isRequestSent && (
            <button onClick={handleSendRequest} disabled={isRequestSent}>
              Request Invitation
            </button>
          )}
          {isRequestSent && <p>You have already sent a request.</p>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            
            <div>
              <h2>Guest Invitation List</h2>
              {party.user.id === userId && <RequestList partyId={id} />}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PartyDetail;
