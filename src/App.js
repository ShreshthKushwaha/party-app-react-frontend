import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import React from 'react';
import PartyDetail from './components/parties/PartyDetail';
import AddPartyForm from './components/parties/forms/AddPartyForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/party/:id" element={<PartyDetail />} /> {/* Route for the party detail page */}
        <Route path="/add-party" element={<AddPartyForm />} /> {/* Route for the add party form */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
