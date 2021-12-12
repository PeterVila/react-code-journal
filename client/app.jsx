import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Navbar from './components/navbar';
import Entries from './pages/entries';

export default class App extends React.Component {
  render() {
    return (
    <>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Entries/>} />
      <Route path="/home" element={<Home/>} />
      </Routes>
    </>
    );
  }
}
