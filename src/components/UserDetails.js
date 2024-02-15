import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/users/${userId}`);
        console.log(response.data); 
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Dependency array with userId

  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <div>
          <p>Name: {user.fname}</p>
          <p>Email: {user.email}</p>
          {/* Add other user details here */}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
