import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Error from './Error';
import styles from './Header.css';

class Header extends Component {
  render() { 
    return (
      <div className={styles.header}>

        <section className="header-container">
          <div className="logo">
            <h1>Grass Fire Water</h1>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
              </li>
            </ul>
          </nav>
        </section>
      
        <Error/>
      </div>
    );
  }
}

export default Header;