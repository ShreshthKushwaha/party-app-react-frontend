import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import User from './User';
import Header from '../appComponents/headers/Header';


const UserDetail = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);
  
 

  useEffect(() => {
  
    axios.get(`http://localhost:9090/api/users/${id}`)
      .then(response => {
        setUser(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });

  }, [id]);

  

  

  return (
    <div>
      <Header title="User Details"/>
      <div style={{ 
      background: 'linear-gradient(to right,white, #edf5ff)',
      minHeight: '100vh',
      padding: '20px',
    }}>
    
      
      {user ? (<>
      <User user={user}/>
      </>)
       : (
        <p>Loading...</p>
      )}
    </div>
    </div>
    
  );
};

export default UserDetail;
