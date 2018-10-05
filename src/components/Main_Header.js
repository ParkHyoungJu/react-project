import React, { Component } from 'react';
import Background1 from '../images/home-gradient.png';
import Background2 from '../images/background.jpg';
import MainSearchInput from './Main_Search_Input';

class Main_Header extends Component{
  constructor(){
    super();
    this.state = {
      backgroundImage: [`url(${Background1})` , `url(${Background2})`]
    }
  }

  render(){
    const { backgroundImage } = this.state;
    return(
      <div className="flight-search" style={{backgroundImage}}>
        <h1 className="hide-small">
          Rio de Janeiro, Brazil <br/> you can't find anywhere else.
        </h1>
        <h2 className="hide-small">
          Our flights are so cheap, United
          <a href="http://money.cnn.com/2015/05/01/investing/united-airlines-lawsuit-skiplagged/index.html" target="_blank" className="font-medium sued-us" rel="noopener noreferrer">
            sued us
          </a>
          ... but we won.
        </h2>
        <MainSearchInput></MainSearchInput>
      </div>
    );
  }
}

export default Main_Header;
