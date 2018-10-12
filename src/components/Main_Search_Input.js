import React, { Component } from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
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

class Main_Search_Input extends Component{

  constructor(props){
    super(props);
    this.state = {
      type: 'rt',
      srcAirport: INCHEON,
      dstAirport: KANSAI,
      srcAirportValue: 'ICN',
      dstAirportValue: 'KIX',
      error: null,
      srcAirports: [],
      dstAirports: [],
      srcUlStyle: {},
      dstUlStyle: {},
      startDateStyle: {},
      endDateStyle: {},
      dates: null
    };
  }

  setDates(){
    this.setState({
      ...this.state,
      dates: this.props.dates
    });
  }

  tripTypeClick = (tripType) => {
    this.setState({
      ...this.state,
      type: tripType
    });
  }

  handleKeyUp = (e) => {
    this.getAutocomplete(e);
  }

  handleChange = (e) => {
    if(e.target.classList.contains('src-input')){
      this.setState({
        ...this.state,
        srcAirportValue: e.target.value
      });
    }else{
      this.setState({
        ...this.state,
        dstAirportValue: e.target.value
      });
    }
  }

  handleClick = (e) => {
    this.setInputPosition();
    if(e.target.classList.contains('ui-autocomplete-input')){
      this.getAutocomplete(e);
    }else{
      setTimeout(function(){
        document.getElementById('date-picker-div').style.display = 'block';
      }, 200);

    }
  }

  handleBlur = (e) => {
    if(e.relatedTarget === null || e.relatedTarget.id !== 'date-picker-div'){
      setTimeout(function(){
        Array.prototype.forEach.call(document.getElementsByClassName('ui-widget'), function(target){
            target.style.display = 'none'
          }
        );
      }, 100);
    }
  }

  handleListClick = (target, airport) => {
    if(target === 'src'){
      this.setState({
        ...this.state,
        srcAirport: airport
      });
    }else{
      this.setState({
        ...this.state,
        dstAirport: airport
      });
    }
  }

  onSelect = (dates) => {
    console.log(dates);
    this.setState({
      ...this.state,
      dates
    });
    document.getElementById('date-picker-div').style.display = 'none';
    if(this.state.type === 'rt'){
      document.getElementsByClassName('start-date')[0].value = dates.start.format('MMM DD');
      document.getElementsByClassName('end-date')[0].value = dates.end.format('MMM DD');
    }else{
      document.getElementsByClassName('start-date')[0].value = dates.format('MMM DD');
    }
  }

  getAirports(value, isSrcInput) {
    let $uiAutocomplete = isSrcInput? document.getElementById('ui-id-1') : document.getElementById('ui-id-2');

    fetch("http://10.5.39.169:8050/airports/search/" + value)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if(isSrcInput){
            this.setState({
              ...this.state,
              srcAirports: result
            });
          }else{
            this.setState({
              ...this.state,
              dstAirports: result
            });
          }
          if(result.length > 0){
            $uiAutocomplete.style.display = 'block';
          }
        },
        (error) => {
          this.setState({
            ...this.state,
            srcAirports: [],
            dstAirports: [],
            error
          });
        }
      );
  }

  setInputPosition(){
    let srcLeftPosition = document.getElementsByClassName('trip-row')[0].offsetLeft;
    let dstLeftPosition = srcLeftPosition + document.getElementsByClassName('src-input')[0].offsetWidth;
    let startDateLeftPosition = dstLeftPosition + document.getElementsByClassName('dst-input')[0].offsetWidth;
    let endDateLeftPosition = startDateLeftPosition + document.getElementsByClassName('start-date')[0].offsetWidth;
    let topPosition = document.getElementsByClassName('trip-row')[0].offsetTop + 70;
    let defaultCalWidth = 650;

    if(window.innerWidth - (startDateLeftPosition + defaultCalWidth) < 0){
      startDateLeftPosition += (window.innerWidth - (startDateLeftPosition + defaultCalWidth))
    }

    this.setState({
      ...this.state,
      srcUlStyle: {
        display: 'none',
        top: topPosition,
        left: srcLeftPosition,
        width: '400px'
      },
      dstUlStyle: {
        display: 'none',
        top: topPosition,
        left: dstLeftPosition,
        width: '400px'
      },
      startDateStyle: {
        display: 'none',
        position: 'absolute',
        top: topPosition,
        left: startDateLeftPosition,
        width: '650px',
        backgroundColor: 'white'
      },
      endDateStyle: {
        display: 'none',
        position: 'absolute',
        top: topPosition,
        left: endDateLeftPosition,
        width: '310px',
        backgroundColor: 'white'
      }
    });
  }

  getAutocomplete(e){
    let isSrcInput = e.target.classList.contains('src-input');
    let value = e.target.value;
    if(value.length > 1){
      this.getAirports(value, isSrcInput);
    }else{
      if(isSrcInput){
        this.setState({
          ...this.state,
          srcAirports: []
        });
      }else{
        this.setState({
          ...this.state,
          dstAirports: []
        });
      }

      Array.prototype.forEach.call(document.getElementsByClassName('ui-autocomplete'), function(target){
        target.style.display = 'none';
      });
    }
  }

  componentDidMount(){
    this.setInputPosition();
    window.addEventListener('resize', () => {
      this.setInputPosition();
    });
  }

  render(){
    const srcAirportList = this.state.srcAirports.map(
      (airport) => (
          <li key={airport.id} className="ui-menu-item" id={`ui-id-${airport.id}`} tabIndex="-1" onClick={(e) => this.handleListClick('src', airport)}>
            <a>
              <span className="autocomplete-em">{airport.city.iataCode}({airport.iataCode})</span>
              {airport.name}
            </a>
          </li>
        )
    );
    const dstAirportList = this.state.dstAirports.map(
      (airport) => (
          <li key={airport.id} className="ui-menu-item" id={`ui-id-${airport.id}`} tabIndex="-1" onClick={() => this.handleListClick('dst', airport)}>
            <a>
              <span className="autocomplete-em">{airport.city.iataCode}({airport.iataCode})</span>
              {airport.name}
            </a>
          </li>
        )
    );
    const minDate = new Date();
    const maxDate = moment(minDate).add('10', 'M').date(0).toDate();
    return(
      <form className="flight-search-form ui-front">
        <div className="trip-type-selection">
          <button type="button" className={`trip-type ${this.state.type === 'rt'? 'active-trip': ''}`} onClick={() => this.tripTypeClick("rt")}>Round Trip</button>
          <button type="button" className={`trip-type ${this.state.type === 'ow'? 'active-trip': ''}`} onClick={() => this.tripTypeClick("ow")}>One Way</button>
        </div>
        <div className="form-row">
          <div className="trip-row" onClick={this.handleClick} onBlur={this.handleBlur}>
            <label className="input-label location-input">
              <span className="input-label-text">From</span>
              <input type="text" className="src-input ui-autocomplete-input" placeholder="" value={this.state.srcAirportValue} data-shadow="SEOUL" onKeyUp={this.handleKeyUp} onChange={this.handleChange}/>
              <div className="input-shadow">
                <span className="truncate">{this.state.srcAirport.name}</span>
              </div>
              <span className="input-icon hidden" data-toggle="tooltip" data-placement="bottom" title="Swap origin and destination">
                <i className="retina-icon-swap"/>
              </span>
            </label>
            <label className="input-label location-input">
              <span className="input-label-text">To</span>
              <input type="text" className="dst-input ui-autocomplete-input" placeholder="" value={this.state.dstAirportValue} data-shadow="Anywhere" onKeyUp={this.handleKeyUp} onChange={this.handleChange}/>
              <div className="input-shadow">
                <span className="truncate">{this.state.dstAirport.name}</span>
              </div>
              <span className="input-icon" data-toggle="tooltip" title="Fly anywhere">
                <i className="retina-icon-globe"/>
              </span>
            </label>
            <div className="date-inputs date-range-picker">
              <label className="input-label date-input-label">
                <span className="input-label-text">Departure</span>
                <input type="text" className="date-input start-date hasDatepicker" placeholder="Depart" readOnly />
              </label>
              <label className={`input-label date-input-label ${this.state.type === 'ow' && 'hidden'}`}>
                <span className="input-label-text">Return</span>
                <input type="text" className="date-input end-date hasDatepicker" placeholder="Return" readOnly />
              </label>
            </div>
          </div>
          <button type="button" className="blue-btn" onClick={() => this.props.handleToChild(this.state.type, this.state.srcAirport, this.state.dstAirport, this.state.dates)}>Search Flights</button>
        </div>
        <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-1" tabIndex="0" style={this.state.srcUlStyle}>
          {srcAirportList}
        </ul>
        <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-2" tabIndex="0" style={this.state.dstUlStyle}>
          {dstAirportList}
        </ul>
        <div className="ui-widget ui-widget-content" id="date-picker-div" style={this.state.startDateStyle} tabIndex="0" onBlur={this.handleBlur}>
          <DateRangePicker
            selectionType={this.state.type === 'ow'? 'single': 'range'}
            onSelect={this.onSelect}
            value={this.state.type === 'ow'? this.state.dates.start :this.state.dates}
            singleDateRange={true}
            numberOfCalendars={2}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </div>
      </form>
    );
  }
}

export default Main_Search_Input;
