import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  render() {
    const { state } = this;
    return (
      <Router>
        <div className="container-fluid">
          <Route path="/" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
