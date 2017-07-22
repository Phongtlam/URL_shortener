import React, { Component } from 'react';
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

  onSubmitHandler() {
    console.log('HI', this.state.url)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>URL shortener</h2>
        </div>
        <div><input
          className="input-field"
          value={this.state.url}
          onChange={this.onChangeHandler}
        />
        </div>
        <button onClick={this.onSubmitHandler}>Get shortened URL</button>
      </div>
    );
  }
}

export default App;
