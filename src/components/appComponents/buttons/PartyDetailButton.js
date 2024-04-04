import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const PartyDetailButton = (props) => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/party/${props.partyId}`);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleButtonClick}>
      Details
    </Button>
  );
};

export default PartyDetailButton;