import React, { useState, useReducer } from 'react';
import Select from 'react-select';

export default function Home(props) {
  return (
    <div className="entry-page">
      <h1>New Entry</h1>
      <div className="container">
        <div className="row">
          <div className="placeholder"></div>
          <div className="inputs">
            <Inputs />
            <div className="row">
              <button>Submit</button>
              <MyComponent />
            </div>
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

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState({
    value: 'javascript',
    label: 'JavaScript'
  });
  const [handleChange] = useState(() => {
    return () => {
      setSelectedOption(selectedOption);
    };
  });
  return (
  <div>
    <label>Technologies: </label>
  <Select
    defaultValue={[colourOptions[2]]}
    isMulti
    name="colors"
    options={colourOptions}
    className="basic-multi-select"
    classNamePrefix="select"
   onChange={handleChange} />
  </div>
  );
}

const colourOptions = [
  { value: 'HTML', label: 'HTML', color: '#00B8D9', isFixed: true },
  { value: 'CSS', label: 'CSS', color: '#0052CC', disabled: true },
  { value: 'JavaScript', label: 'JavaScript', color: '#5243AA' },
  { value: 'React', label: 'React', color: '#FF5630', isFixed: true },
  { value: 'Express', label: 'Express', color: '#FF8B00' },
  { value: 'Node.js', label: 'Node.js', color: '#FF8B00' },
  { value: 'PostgreSql', label: 'PostgreSql', color: '#FF8B00' }
];
