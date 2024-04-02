import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/parties">Parties</Link></li>
          <li><Link to="/animals">Animals</Link></li>
          <li><Link to="/my-parties">My Parties</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
