import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PartyDetailButton from '../appComponents/buttons/PartyDetailButton';
const Party = (props) => {
  const cardStyles = {
    backgroundColor: '#DDE0FE',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    height: '350px',
    marginBottom: '20px',
    margin: '10px',
    border: '1px solid #ccc',
    width: '250px',
  };

  const titleStyles = {
    marginTop: '0',
  };

  const paragraphStyles = {
    margin: '0',
    color: '#666',
  };

  return (
    <div style={cardStyles}>
      <h3 style={titleStyles}>{props.title}</h3>
      <p style={paragraphStyles}>Date: {props.partyDate}</p>
      {/* Use Link to redirect to the party detail page */}
      <PartyDetailButton partyId={props.partyId} />
    </div>
  );
};

export default Party;
