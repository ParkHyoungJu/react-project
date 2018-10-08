import React, { Component } from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import moment from 'moment';

class Main_Search_Input extends Component{

  constructor(props){
    super(props);
    this.state = {
      type: 'rt',
      srcCity: 'SEL',
      dstCity: 'TYO',
      srcCityShadow: 'SEOUL',
      dstCityShadow: 'TOKYO',
      error: null,
      srcCities: [],
      dstCities: [],
      srcUlStyle: {},
      dstUlStyle: {},
      startDateStyle: {},
      endDateStyle: {},
      dates: null
    };
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
        srcCity: e.target.value
      });
    }else{
      this.setState({
        ...this.state,
        dstCity: e.target.value
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

  handleListClick = (target, city) => {
    if(target === 'src'){
      this.setState({
        ...this.state,
        srcCity: city.iataCode,
        srcCityShadow: city.name
      });
    }else{
      this.setState({
        ...this.state,
        dstCity: city.iataCode,
        dstCityShadow: city.name
      });
    }
  }

  onSelect = (dates) => {
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

  getCities(value, isSrcInput) {
    let $uiAutocomplete = isSrcInput? document.getElementById('ui-id-1') : document.getElementById('ui-id-2');

    fetch("http://10.5.39.169:8050/cities/search/" + value)
      .then(res => res.json())
      .then(
        (result) => {
          if(isSrcInput){
            this.setState({
              ...this.state,
              srcCities: result
            });
          }else{
            this.setState({
              ...this.state,
              dstCities: result
            });
          }

          if(result.length > 0){
            $uiAutocomplete.style.display = 'block';
          }
        },
        (error) => {
          this.setState({
            ...this.state,
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
      this.getCities(value, isSrcInput);
    }else{
      if(isSrcInput){
        this.setState({
          ...this.state,
          srcCities: []
        });
      }else{
        this.setState({
          ...this.state,
          dstCities: []
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
    const srcCityList = this.state.srcCities.map(
      (city) => (
          <li key={city.id} className="ui-menu-item" id={`ui-id-${city.id}`} tabIndex="-1" onClick={(e) => this.handleListClick('src', city)}>
            <a>
              <span className="autocomplete-em">{city.iataCode}</span>
              {city.name}
            </a>
          </li>
        )
    );
    const dstCityList = this.state.dstCities.map(
      (city) => (
          <li key={city.id} className="ui-menu-item" id={`ui-id-${city.id}`} tabIndex="-1" onClick={() => this.handleListClick('dst', city)}>
            <a>
              <span className="autocomplete-em">{city.iataCode}</span>
              {city.name}
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
              <input type="text" className="src-input ui-autocomplete-input" placeholder="" value={this.state.srcCity} data-shadow="SEOUL" onKeyUp={this.handleKeyUp} onChange={this.handleChange}/>
              <div className="input-shadow">
                <span className="truncate">{this.state.srcCityShadow}</span>
              </div>
              <span className="input-icon hidden" data-toggle="tooltip" data-placement="bottom" title="Swap origin and destination">
                <i className="retina-icon-swap"/>
              </span>
            </label>
            <label className="input-label location-input">
              <span className="input-label-text">To</span>
              <input type="text" className="dst-input ui-autocomplete-input" placeholder="" value={this.state.dstCity} data-shadow="Anywhere" onKeyUp={this.handleKeyUp} onChange={this.handleChange}/>
              <div className="input-shadow">
                <span className="truncate">{this.state.dstCityShadow}</span>
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
          <button type="button" className="blue-btn" onClick={() => this.props.handleToChild(this.state.type, this.state.srcCity, this.state.dstCity, this.state.dates)}>Search Flights</button>
        </div>
        <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-1" tabIndex="0" style={this.state.srcUlStyle}>
          {srcCityList}
        </ul>
        <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-2" tabIndex="0" style={this.state.dstUlStyle}>
          {dstCityList}
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
