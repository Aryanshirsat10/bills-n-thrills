import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UnrevealingTextAnimation from './UnrevealingTextAnimation';
import { UserButton } from '@clerk/clerk-react';
import '../CSS/Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <nav className="navbar">
      <div className="logo left">
        {/* <img src={require('../Assets/logo.png')} alt="Logo" /> */}
        <UnrevealingTextAnimation name="BILLS N THRILLS"/>
      </div>
      <div className="links">
        <NavLink to="/" className={`link ${activeLink === 0 ? 'active' : ''}`} onClick={() => handleLinkClick(0)}>
          <button className="navbtn">
            <span>Dashboard</span>
          </button>
        </NavLink>
        <NavLink to="/expense" className={`link ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleLinkClick(1)}>
          <button className="navbtn">
            <span>Expense</span>
          </button>
        </NavLink>
        <NavLink to="/investments" className={`link ${activeLink === 2 ? 'active' : ''}`} onClick={() => handleLinkClick(2)}>
          <button className="navbtn">
            <span>Investments</span>
          </button>
        </NavLink>
        <NavLink to="/savings" className={`link ${activeLink === 3 ? 'active' : ''}`} onClick={() => handleLinkClick(3)}>
          <button className="navbtn">
            <span>Savings</span>
          </button>
        </NavLink>
      </div>
      <div className="user-button">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
