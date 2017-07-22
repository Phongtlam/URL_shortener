import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      newUrl: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({
      url: e.target.value,
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const url = this.state.url;
    const baseUrl = (process.env.NODE_ENV === 'development') ? `${process.env.REACT_APP_URL}/` : '/';
    axios.post(baseUrl, { url })
    .then((res) => {
      const data = res.data;
      this.setState(prevState => ({
        newUrl: prevState.newUrl.concat(data),
        url: '',
      }));
    })
    .catch((err) => {
      throw ('err', err);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>URL shortener</h2>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            name="url"
            className="input-field"
            value={this.state.url}
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="Get shortened URL" />
        </form>
        <div>This is the URLs:</div>
        <br />
        {this.state.newUrl.map((entry, i) =>
          <List key={i} entry={entry} />,
        )}
      </div>
    );
  }
}

export default App;
