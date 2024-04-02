
import Header from './appComponents/headers/Header';
import Parties from './parties/lists/Parties';
import Footer from './appComponents/footers/Footer';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    var [parties, setParties] = useState([]);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  console.log('userId:', userId);
    

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
    <div className="app">

        <Header title="Party Animal🍺🍺"/>
        user id: {userId}
       
        <Parties parties = {parties}/>
       
        <Footer/>

      </div>
  );
}

export default Home;