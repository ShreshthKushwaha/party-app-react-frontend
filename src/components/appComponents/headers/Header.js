import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Header = (props) => {
  const headerStyles = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  };

  return (
    <div style={headerStyles}>
      {props.title}

      <Link to="/add-party" style={{ color: '#fff', marginLeft: '20px' }}>
        Add Party + </Link>



        <Link to="/my-parties" style={{ color: '#fff', marginLeft: '20px' }}>
        My Parties </Link>    


       

      
    </div>
  );
};

Header.defaultProps = {
  title: 'Party Animal',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
