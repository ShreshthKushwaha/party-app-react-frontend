
import Header from '../appComponents/headers/Header';
import MyPartyList from './lists/MyPartyList';
//import Footer from './appComponents/footers/Footer';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyParties = () => {

    var [parties, setParties] = useState([]);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  console.log('userId:', userId);


  useEffect(() => {
    // Fetch list of parties from the backend API
    axios.get(`http://localhost:9090/api/users/${userId}/parties`)
      .then(response => {
        setParties(response.data);
      })
      .catch(error => {
        console.error('Error fetching parties:', error);
      });
  }, []); 


  return (
    <div className="app">
    <Header title="Party Animal🍺🍺"/>
    
        Hii here are all the parties listed by you: {userId}
       
        <MyPartyList parties = {parties}/>
       


      </div>
  );
}

export default MyParties;