import React, { Component } from 'react';
import MainHeader from './Main_Header';
import MainBody from './Main_Body';
import moment from 'moment';

const INCHEON = {
  cityId: 10413,
  iataCode: "ICN",
  icaoCode: null,
  id: 13050,
  latitude: "37.425000",
  longitude: "126.375000",
  name: "INCHEON INTERNATIONAL",
  timezone: "Asia/Seoul",
  type: "A",
  city: {
    countryId: "KR",
    iataCode: "SEL",
    id: 10413,
    latitude: "37.516667",
    longitude: "126.933333",
    name: "SEOUL",
    timezone: null
  }
}

const KANSAI = {
  cityId: 8081,
  iataCode: "KIX",
  icaoCode: null,
  id: 13718,
  latitude: "34.431944",
  longitude: "135.230278",
  name: "KANSAI INTERNATIONAL",
  timezone: "Asia/Tokyo",
  type: "A",
  city: {
    countryId: "JP",
    iataCode: "OSA",
    id: 8081,
    latitude: "34.783333",
    longitude: "135.433333",
    name: "OSAKA",
    timezone: null
  }
}

const TODAY = moment()

class Main extends Component{

  constructor(){
    super();
    this.state = {
      type: 'rt',
      srcAirport: INCHEON,
      dstAirport: KANSAI,
      dates: {start: TODAY, end: TODAY.add(1, 'days')}
    }
  }

  handleToMain(type, srcAirport, dstAirport, dates){
    this.setState({
      type: type,
      srcAirport: srcAirport,
      dstAirport: dstAirport,
      dates: dates
    });
  }

  render() {
    return(
      <main id="home-container">
        <MainHeader handleToMain={this.handleToMain.bind(this)}></MainHeader>
        <MainBody
          type={this.state.type}
          srcAirport={this.state.srcAirport}
          dstAirport={this.state.dstAirport}
          dates={this.state.dates}></MainBody>
      </main>
    );
  }
}

export default Main;
