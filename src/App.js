import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import React, { useState } from 'react';
import PartyDetail from './components/parties/PartyDetail';
import AddPartyForm from './components/parties/forms/AddPartyForm';
import Login from './components/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/party/:id" element={<PartyDetail />} />
            <Route path="/add-party" element={<AddPartyForm />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
