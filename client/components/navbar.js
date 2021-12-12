import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="background navbar-row">
        <h1>Code Journal</h1>
        <input type="text"></input>
        <h2><Link to="/home">Create</Link></h2>
        <h2><Link to="/">View</Link></h2>
      </div>
    </div>
  );
}
