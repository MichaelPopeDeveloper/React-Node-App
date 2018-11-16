import React, { Component } from 'react';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

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
      <div className="container-fluid">
        <Login />
      </div>
        );
      }
    }
    
    export default App;
