import React from 'react';
import './navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="background navbar-row">
        <h1>Code Journal</h1>
        <input type="text"></input>
        <h2>Create</h2>
        <h2>View</h2>
      </div>
    </div>
  );
}
