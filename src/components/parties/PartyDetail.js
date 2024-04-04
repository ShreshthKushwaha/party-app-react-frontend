import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RequestList from '../requests/RequestList';
import { useSelector } from 'react-redux';
import Header from '../appComponents/headers/Header';
import { Navigate } from 'react-router-dom';

const PartyDetail = () => {

  const { id } = useParams();
  const [party, setParty] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const [user, setUser] = useState(null);

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
    axios.get(`http://localhost:9090/api/users/${userId}`)
      .then(response => {
        setUser(response.data);
     
        checkRequestStatus();
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
      
  }, [userId]);

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
  

  const handleDeleteParty = () => {
    axios.delete(`http://localhost:9090/api/parties/${id}`)
      .then(response => {
      
      
        alert('Party deleted');

      
      })
      .catch(error => {
        console.error('Error deleting party:', error);
      });
  };

  return (
    <div>
      <Header title={party?party.title:'Loading'}/>
      <div style={{ 
      background: 'linear-gradient(to right,white, #edf5ff)',
      minHeight: '100vh',
      padding: '20px',
    }}>
    
      
      {party ? (
        <div>

                    <div style={{ 
          background: 'linear-gradient(to right,white, #edf5ff)',
          padding: '20px',
          border: '3px solid black',
        }}><p><b>Title:</b> {party.title}</p>
          <p><b>Party Date: </b>{party.partyDate}</p>
          <p><b>Description: </b>{party.description}</p>
          <h4><b>VENUE DETAILS</b></h4>
          <p><b>🏠 Address: </b>{party.address}</p>
          <p><b>🏙️ ZIP CODE: </b>{party.zip}</p>
          <p><b>🕒 Start time: </b>{party.startTime}</p>
          <p><b>🕒 End time: </b>{party.endTime}</p>

          {/* Add more party details here */}
          {!isRequestSent && (
            <button onClick={handleSendRequest} disabled={isRequestSent}>
              Request Invitation
            </button>
          )}
          {isRequestSent && !isRequestAccepted && <p>You have already sent a request.</p>}
</div>
          {isRequestAccepted && (
            <div style={{
              backgroundColor: '#bfffba',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              border: '2px dotted #ccc',
            }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>🍺🍺💃 CONGRATULATIONS 💃🕺🕺</h3>
              <p style={{ marginBottom: '20px' }}>Dear <b>{user.fname} {user.lname},</b></p>
              <p style={{ marginBottom: '20px' }}>ORGANIZER HAS ACCEPTED YOUR REQUEST.</p>
              <p>🎟️ ONCE YOU GET TO THE VENUE SHOW THEM THIS PAGE TO VERIFY YOUR INVITATIONS. HAVE FUN!! 🎉</p>
              <p>Party Animal Team</p>
              <p>Texas A&M University</p>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              
              {party.user.id === userId && 
              <>
              <div style={{padding:'10px'}}>
              <button onClick={handleDeleteParty}>Delete Party</button>
              </div>
                
               <h2>Guest Invitation List</h2>
              <RequestList partyId={id} />
             
              </>
              }
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
    
  );
};

export default PartyDetail;
