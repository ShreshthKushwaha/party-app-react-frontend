import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaCheck, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return '#bfffba'; // Light green
            case 'REJECTED':
                return '#fcaeae'; // Light orange
            case 'PENDING':
            default:
                return '#e6ecf5'; // Light blue
        }
    };

    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {invitations.map(invitation => (
                <li key={invitation.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: getStatusColor(invitation.status) }}>
                    <div>
                        <p><FaUser /> From: {userDetails[invitation.userId]?.fname}</p>
                        <p>Status: {invitation.status}</p>
                    </div>
                    <div>
                        <button onClick={() => handleCheckProfile(invitation.userId)} style={{ marginRight: '10px' }}><FaUser /> Check Profile</button>
                        {invitation.status !== 'ACCEPTED' && <button onClick={() => handleAccept(invitation.id)} style={{ marginRight: '5px', backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}><FaCheck /> Accept</button>}
                        {invitation.status !== 'REJECTED' && <button onClick={() => handleReject(invitation.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}><FaTimes /> Reject</button>}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default RequestList;
