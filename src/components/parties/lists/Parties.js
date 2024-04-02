import React from 'react';
import Party from '../Party.js';

const Parties = (props) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Align items in the center horizontally
  };

  const tileStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Align party tiles in the center horizontally
  };

  const headingStyles = {
    marginBottom: '20px', // Add some bottom margin for spacing
    textAlign: 'center', // Align heading text in the center horizontally
  };

  return (
    <div style={containerStyles}>
      <h3 style={headingStyles}>HOUSE PARTIES IN MY CITY</h3>
      <div style={tileStyles}>
        {props.parties.map(party => (
          <Party key={party.id} {...party} />
        ))}
      </div>
    </div>
  );
};

export default Parties;
