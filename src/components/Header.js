import React, { Component } from 'react';
import mainLogo from '../images/g-dori.png';

class Header extends Component {

  state = {
    headers: [
      { id: 0, text: 'Flights', checked: true, url: '/flights'},
      { id: 1, text: 'Hotels', checked: false, url: '/hotels'}
    ]
  }

  handleActive = (id) => {
    const { headers } = this.state;

    const index = headers.findIndex(header => header.id === id);
    const selected = headers[index];
    const nextHeaders = [...headers];

    nextHeaders[index] = {
      ...selected,
      checked: !selected.checked
    }

    this.setState({
      headers: nextHeaders
    });
  }

  render () {
    const { headers } = this.state;
    const {
      handleActive
    } = this;
    const headerList = headers.map(
      (header) => (
          <li {...header} key={header.id}>
            <a href={header.url} className={`hover-bold ${header.checked? 'active': ''}`} onClick={() => this.handleActive(header.id)}>{header.text}</a>
          </li>
      )
    );
    return (
      <header id="header-container" className="header-container home-header header-container__home">
        <nav>
          <div className="header-left">
            <a href="/" className="logo">
              <img className="" src={mainLogo} alt="tcat" width="25px" height="25px"/>
              <span className="hide-small">tcat</span>
            </a>
            <ul id="site-nav" className="ul-group">
              {headerList}
            </ul>
          </div>
          <div className="header-right">

          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
