import React, { useState, useReducer } from 'react';

export default function Home(props) {
  return (
    <div className="entry-page">
      <h1>New Entry</h1>
      <div className="container">
        <div className="row">
          <div className="placeholder"></div>
          <div className="inputs">
            <Inputs />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return {
        ...state,
        Title: action.Title
      };
    case 'link':
      return {
        ...state,
        Link: action.Link
      };
    case 'image':
      return {
        ...state,
        Image: action.Image
      };
    case 'description':
      return {
        ...state,
        Description: action.Description
      };
    default:
      return state; // If the action isn't any of these
  }
};

function Inputs(props) {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <form>
      <label>Title</label>
      <input type="text" onChange={event => { dispatch({ type: 'title', Title: event.target.value }); }}>{state.title}</input>
      <label>Link</label>
      <input type="text" onChange={() => { dispatch({ type: 'link', Link: event.target.value }); }}>{state.link}</input>
      <label>Image Upload</label>
      <input type="text" onChange={() => { dispatch({ type: 'image', Image: event.target.value }); }}>{state.image}</input>
      <label>Description</label>
      <textarea onChange={() => { dispatch({ type: 'description', Description: event.target.value }); }}>{state.description}</textarea>
    </form>
  );
}
