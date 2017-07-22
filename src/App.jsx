import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
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
    axios.post(`${process.env.REACT_APP_URL}/url`, { url })
    .then(() => {
      this.setState({ url: '' });
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
      </div>
    );
  }
}

export default App;
