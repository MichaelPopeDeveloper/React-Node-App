import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/Protected';
import Admin from './components/Admin';
import AuthExample from './components/Auth';
import * as axios from 'axios';
import * as localStorage from './dir/helper/localStorage';
import * as tokenHelper from './dir/helper/JWT';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
    // this.isLoggedIn = this.isLoggedIn.bind(this);
    // this.checkToken = this.checkToken.bind(this);

    this.auth = {
      checkToken: async () => {
        const localToken = localStorage.getItem('token');
        const isAuthenticated = await axios.post('/user/checkToken', {
          token: localToken,
        })
          .then((res) => {
            const { authenticated } = res.data;
            console.log(authenticated);
            this.setState({ isAuth: authenticated });
            console.log('auth: ' + this.state.isAuth);
            return authenticated;
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
        return isAuthenticated;
      },
    };
  }

  componentWillMount() {
    this.auth.checkToken();
    // this.setState({ isAuth: this.isLoggedIn() });
    // this.checkToken();
    // const log = () => {
    //   console.log(this.state.isAuth);
    // };
    // setInterval(log, 1000);
  }

  // async checkToken() {
  //   const localToken = localStorage.getItem('token');
  //   const isAuthenticated = await axios.post('/user/checkToken', {
  //     token: localToken,
  //   })
  //     .then((res) => {
  //       const { authenticated } = res.data;
  //       console.log(authenticated);
  //       this.setState({ isAuth: authenticated });
  //       return authenticated;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       return false;
  //     });
  //   return isAuthenticated;
  // }

  // async isLoggedIn() {
  //   // const auth = await this.checkToken();
  //   // console.log({ msg: auth });
  //   // return auth;
  // }

  render() {
    const { state } = this;
    return (
      // <Router>
      //   <div className="container-fluid">
      //     <Route path="/" component={AuthExample} />
      //     <Route path="/login" component={Login} />
      //     <ProtectedRoute path="/test" component={Admin} auth={true} />
      //   </div>
      // </Router>
      <AuthExample />
    );
  }
}

export default App;
