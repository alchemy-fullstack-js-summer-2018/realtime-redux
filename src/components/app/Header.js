import React, { Component } from 'react';
import Error from './Error';
import logo from '../../assets/logo.svg';
import styles from './Header.css';

class Header extends Component {

  static propTypes = {

  };
  
  render() {

    return (
      <div className={styles.header}>

        <section className="header-container">
          <div className="logo">
            <img src={logo}/>
            <h1> Rock Paper Scissors</h1>
          </div>
          
        </section>
      
        <Error/>
      </div>
    );
  }
}

export default Header;
