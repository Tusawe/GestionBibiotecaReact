import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <br/><br/><br/>
        <div align="center">
          <h1>Bienvenido a BookStore</h1>
          <h3>¡Tu app de gestión de biblioteca favorita!</h3><br/>
          <img src="https://images.vexels.com/media/users/3/157272/isolated/preview/e6d8b2a22f0f860af01343af96e94a8a-libros-apilados-vector-by-vexels.png"></img>
        </div>
      </div>
    );
  }
}

export default Home;