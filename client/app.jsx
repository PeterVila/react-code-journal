import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import Entries from './pages/entries';

export default class App extends React.Component {
  render() {
    return (
      <>
      <Navbar />
      <Entries />
      {/* <Home /> */}
      </>
    );
  }
}
