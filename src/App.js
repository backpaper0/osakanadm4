import React, { useState } from 'react';

const Photo = (props) => {
  const [fav, setFav] = useState(props.fav);
  const { image, title } = props;
  const addFav = () => setFav(fav => fav + 1);
  return (
    <div style={{ border: "1px solid silver", margin: "25px 0" }}>
      <div>
        <img style={{ width: "100%" }} src={`http://localhost:8080${image}`}/>
      </div>
      <div style={{ padding: "0 5px" }}>{title}</div>
      <div style={{ padding: "0 5px" }}>
        <button style={{ cursor: "pointer", border: 0, fontSize: "large",
            backgroundColor: "transparent", color: fav === 0 ? "gray" : "PaleVioletRed" }}
          onClick={addFav}>{fav === 0 ? "☆" : "★" }</button>
        <span>
          いいね！
          <span>{fav}</span>
          件
        </span>
      </div>
    </div>
  );
};

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  async componentDidMount() {
    const resp = await fetch("http://localhost:8080/api/photos.json");
    const json = await resp.json();
    const photos = json.map(a => ({ ...a, fav: 0 }));
    this.setState({ photos });
  }

  render() {
    const { photos } = this.state;
    return (
      <div>
        <header style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "40px",
            borderBottom: "1px solid silver", boxSizing: "border-box", display: "flex",
            alignItems: "center", backgroundColor: "white" }}>
          <h1 style={{ fontSize: "large", fontStyle: "italic", margin: 0 }}>Osakanagram</h1>
        </header>
        <div style={{ width: "500px", margin: "65px auto" }}>
          {photos.map(a => <Photo {...a}/>)}
        </div>
      </div>
    );
  }
}

export default App;
