import React, { Component } from 'react';

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
    const baseUrl = (process.env.NODE_ENV === 'development') ? `${process.env.REACT_APP_URL}/` : '/';
    fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.state.url }),
    })
    .then(data => data.json())
    .then((data) => {
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
        <nav className="navbar navbar-default">
          <form
            className="navbar-form navbar-search"
            onSubmit={this.onSubmitHandler}
          >
            <input
              type="text"
              name="url"
              className="input-field"
              value={this.state.url}
              onChange={this.onChangeHandler}
            />
            <button
              className="btn btn-search btn-info"
              type="submit"
            ><span className="glyphicon glyphicon-search" />
              <span className="label-icon"> Get shortened URL</span>
            </button>
          </form>
        </nav>
        <div>This is your URLs:</div>
        <br />
        {this.state.newUrl.map((entry, i) =>
          <List key={i} entry={entry} />,
        )}
      </div>
    );
  }
}

export default App;
