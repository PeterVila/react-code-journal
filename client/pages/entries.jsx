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
      return (
        <div key={index} className="entry row">
          <img className="main-image"src={image}/>
          <div className="data">
            <h1>{title}</h1>
            <p className="link">{link}</p>
            <p className="tech-description">{description}</p>
            <p className="tech-header">Technologies: </p>
            <div className="all-tech-logos">{techArray.map((tech, i) => {
              return <img className="tech-logos" key={i} src={`/${tech.toUpperCase()}.png`}/>;
            })}</div>
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
