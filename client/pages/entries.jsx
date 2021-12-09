import React from 'react';

export default class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      loading: true
    };
  }

  componentDidMount() {
    fetch('/api/entries')
      .then(response => response.json())
      .then(data => this.setState({
        posts: data,
        loading: false
      }));
  }

  render() {
    const entries = this.state.posts && this.state.posts.map((post, index) => {
      const { description, image, link, technologies, title, createdAt } = post;
      const techArray = technologies.split(', ');
      console.log(techArray);
      return (
        <div key={index} className="entry">
          <img src={image}/>
          <div className="data">
            <h1>{title}</h1>
            <p className="link">{link}</p>
            <p>Description: {description}</p>
            <p>Technologies: {techArray.map((tech, i) => {
              return <img className="tech-logos" key={i} src={`${tech}.jpg`}/>;
            })}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="entries">
        {entries}
      </div>
    );
  }
}
