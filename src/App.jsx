import React, { Component } from 'react';
import * as axios from 'axios';
import * as localStorage from './dir/helper/localStorage';
import * as tokenHelper from './dir/helper/JWT';
import logo from './logo.svg';
import './App.css';
import { token } from 'morgan';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    // fetch('/user/profile')
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));

    // axios.get('/user/profile')
    //   .then(res => console.log(res))
    //   .catch(a => console.log(a));

    // axios.post('/user/signUp', {
    //   name: 'Michael',
    //   email: 'michaelpopedeveloper@gmail.com',
    //   password: 'password123',
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    this.login();
  }

  login() {
    axios.post('/user/login', {
      name: 'Michael',
      email: 'michaelpopedeveloper@gmail.com',
      password: 'password123',
    })
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        const decodedToken = tokenHelper.decodeToken(token);
        if (token) {
          localStorage.setItem('token', token);
          this.setState({ name: decodedToken.name });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { state } = this;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
           <h1>
            INotes
          </h1>
          <h3>
            Hello, {state.name}
          </h3>
          <h1>Notes: </h1>
        </header>
      </div>
    );
  }
}

export default App;
