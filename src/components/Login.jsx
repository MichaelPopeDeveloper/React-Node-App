import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';
import '../App.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePaswordChange = this.handlePaswordChange.bind(this);
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
    // this.login();
  }

  login(credentials) {
    axios.post('/user/login', {
      email: credentials.email,
      password: credentials.password,
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

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    // console.log({ email, password });
    this.login({ email, password });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePaswordChange(event) {
    this.setState({ password: event.target.value });
  }


  render() {
    const { state } = this;
    return (
      <Router>
        <div className="row vh-100 login-background">
          <div className="col d-flex flex-column justify-content-center align-items-center align-content-center">
            <h1 className="text-center text-body font-weight-bold display-1">INOTE</h1>
            <h2 className="text-secondary text-center"> Your one stop shop for taking notes</h2>
            <form className="w-50 mt-5 shadow-lg p-5 rounded bg-white" onSubmit={this.handleSubmit}>
              <h1 className="text-center">Login</h1>
              <div className="form-group">
                <label>Email address</label>
                <input value={state.email} onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input value={state.password} onChange={this.handlePaswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div className="form-group">
                <small id="emailHelp" className="form-text text-muted">Not a member? SignUp</small>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </Router>
    );
  }
}

export default Login;
