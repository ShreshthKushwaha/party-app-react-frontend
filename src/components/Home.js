
import Header from './appComponents/headers/Header';
import Parties from './parties/lists/Parties';
import Footer from './appComponents/footers/Footer';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    var [parties, setParties] = useState([]);

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
        <Parties parties = {parties}/>
       
        <Footer/>

      </div>
  );
}

export default Home;