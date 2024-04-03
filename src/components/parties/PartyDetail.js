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
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);

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

  const checkRequestStatus = () => {
    // Make an API call to fetch invitations for the party
    axios.get(`http://localhost:9090/api/${id}/invitations`)
      .then(response => {
        console.log('Invitations:', response.data);
        // Check if any invitation exists for the user
        const hasInvitation = response.data.some(invitation => invitation.userId === userId);
        setIsRequestSent(hasInvitation); // Set to true if invitation exists
        // Check if the invitation is accepted
        const isAccepted = response.data.some(invitation => invitation.userId === userId && invitation.status === 'ACCEPTED');
        setIsRequestAccepted(isAccepted); // Set to true if invitation is accepted
      })
      .catch(error => {
        console.error('Error checking request status:', error);
      });
  };

  const handleSendRequest = () => {
    // Make an API call to send the request
    axios.post(`http://localhost:9090/api/parties/${id}/invitations/${userId}`, {})
      .then(response => {
        setIsRequestSent(true); // Update state to indicate request is sent
      })
      .catch(error => {
        console.error('Error sending request invitation:', error);
      });
  };

  return (
    <div style={{  padding: '20px' }}>
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
          {isRequestSent && !isRequestAccepted && <p>You have already sent a request.</p>}
          {isRequestAccepted && (
            <div style={{
              backgroundColor: isRequestAccepted ? '#bfffba' : 'inherit',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}>
              <p style={{ fontSize: '24px' }}>🎉 CONGRATULATIONS! 🎉</p>
              <p style={{ marginBottom: '20px' }}>ORGANIZER HAS ACCEPTED YOUR REQUEST.</p>
              <p>🎟️ ONCE YOU GET TO THE VENUE SHOW THEM THIS PAGE TO VERIFY YOUR INVITATIONS. HAVE FUN!! 🎉</p>
            </div>
          )}
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
