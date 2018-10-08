import React, { Component } from 'react';
import MainHeader from './Main_Header';
import MainBody from './Main_Body';

class Main extends Component{

  constructor(){
    super();
    this.state = {
      type: 'rt',
      srcCity: 'SEL',
      dstCity: 'TYO',
      dates: null
    }
  }

  handleToMain(type, srcCity, dstCity, dates){
    this.setState({
      type: type,
      srcCity: srcCity,
      dstCity: dstCity,
      dates: dates
    });
  }

  render() {
    return(
      <main id="home-container">
        <MainHeader handleToMain={this.handleToMain.bind(this)}></MainHeader>
        <MainBody
          type={this.state.type}
          srcCity={this.state.srcCity}
          dstCity={this.state.dstCity}
          dates={this.state.dates}></MainBody>
      </main>
    );
  }
}

export default Main;
