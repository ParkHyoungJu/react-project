import React, { Component } from 'react';

class Main_Body extends Component{

  constructor(props){
    super(props);
    this.getAirSeoul();
  }

  getAirSeoul() {
    let departureAirport = this.props.srcAirport.iataCode;
    let arrivalAirport = this.props.dstAirport.iataCode;
    let date1 = this.props.dates.start.format('YYYYMMDD');
    let date2 = this.props.dates.end.format('YYYYMMDD');
    let value = '?departureAirport1=' + departureAirport
      + '&arrivalAirport1=' + arrivalAirport
      + '&departureAirport2=' + arrivalAirport
      + '&arrivalAirport2=' + departureAirport
      + '&date1=' + date1
      + '&date2=' + date2;

    fetch("http://10.5.39.169:8051/airSeoulSearch/" + value)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
        }
      );
  }

  render(){
    return(
      <div className="skip-deals">
        <div className="deal-container" style={{position: 'static', zoom: '1'}}>
          <ul>

          </ul>
        </div>
        <div>{this.props.type}</div>
        <div>{this.props.srcAirport.iataCode}</div>
        <div>{this.props.dstAirport.iataCode}</div>
        <div>{this.props.dates.start.format('YYYYMMDD')}</div>
        <div>{this.props.dates.end.format('YYYYMMDD')}</div>
      </div>
    );
  }
}

export default Main_Body;
