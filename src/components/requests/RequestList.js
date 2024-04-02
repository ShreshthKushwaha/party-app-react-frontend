import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestList = ({ partyId }) => {
    const [invitations, setInvitations] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/${partyId}/invitations`);
                const invitationsData = response.data;
                setInvitations(invitationsData);
            } catch (error) {
                console.error('Error fetching invitations:', error);
            }
        };

        fetchInvitations();
    }, [partyId]);

    useEffect(() => {
        const fetchUserDetails = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:9090/api/users/${userId}`);
                setUserDetails(prevState => ({
                    ...prevState,
                    [userId]: response.data
                }));
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        invitations.forEach(invitation => {
            if (!userDetails[invitation.userId]) {
                fetchUserDetails(invitation.userId);
            }
        });
    }, [invitations, userDetails]);

    const handleCheckProfile = (userId) => {
        // Handle logic to display user details based on userDetails state
        const user = userDetails[userId];
        if (user) {
            console.log('User Details:', user);
        } else {
            console.log('User details not found.');
        }
    };

    const handleAccept = (invitationId) => {
        // Handle accept invitation logic here
    };

    const handleReject = (invitationId) => {
        // Handle reject invitation logic here
    };

    return (
        <ul>
            {invitations.map(invitation => (
                <li key={invitation.id}>
                    <p>From: {userDetails[invitation.userId]?.fname}</p>
                    <p>Status: {invitation.status}</p>
                    <button onClick={() => handleCheckProfile(invitation.userId)}>Check Profile</button>
                    <button onClick={() => handleAccept(invitation.id)}>Accept</button>
                    <button onClick={() => handleReject(invitation.id)}>Reject</button>
                </li>
            ))}
        </ul>
    );
};

export default RequestList;
