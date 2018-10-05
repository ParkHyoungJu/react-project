import React, { Component } from 'react';

class Main_Search_Input extends Component{

  constructor(){
    super();
    this.state = {
      type: 'rt',
      srcCity: 'SEL',
      dstCity: 'TYO',
      srcCityShadow: 'SEOUL',
      dstCityShadow: 'TOKYO',
      isLoaded: false,
      error: null,
      srcCities: [],
      dstCities: [],
      srcUlStyle: {},
      dstUlStyle: {}
    };
  }

  tripTypeClick = (tripType) => {
    this.setState({
      ...this.state,
      type: tripType
    })
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
    this.getAutocomplete(e);

  }

  handleBlur = (e) => {
    setTimeout(function(){
      Array.prototype.forEach.call(document.getElementsByClassName('ui-widget'), function(target){
          target.style.display = 'none'
        }
      );
    }, 100);
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

  getCities(value, isSrcInput) {
    let $uiAutocomplete = isSrcInput? document.getElementById('ui-id-1') : document.getElementById('ui-id-2');

    fetch("http://10.5.39.169:8080/cities/search/" + value)
      .then(res => res.json())
      .then(
        (result) => {
          if(isSrcInput){
            this.setState({
              ...this.state,
              isLoaded: true,
              srcCities: result
            });
          }else{
            this.setState({
              ...this.state,
              isLoaded: true,
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
            isLoaded: true,
            error
          });
        }
      );
  }

  setInputPosition(){
    let srcLeftPosition = document.getElementsByClassName('trip-row')[0].offsetLeft;
    let dstLeftPosition = srcLeftPosition + document.getElementsByClassName('src-input')[0].offsetWidth;
    // let startDateLeftPosition = dstLeftPosition + document.getElementsByClassName('dst-input')[0].offsetWidth;
    // let endDateLeftPosition = startDateLeftPosition + document.getElementsByClassName('start-date')[0].offsetWidth;
    let topPosition = document.getElementsByClassName('trip-row')[0].offsetTop + 70;
    this.setState({
      ...this.state,
      srcUlStyle: {
        display: 'none',
        top: topPosition,
        left: srcLeftPosition,
        width: '400px'
      },
      dstUlStyle:{
        display: 'none',
        top: topPosition,
        left: dstLeftPosition,
        width: '400px'
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
          isLoaded: true,
          srcCities: []
        });
      }else{
        this.setState({
          ...this.state,
          isLoaded: true,
          dstCities: []
        });
      }

      Array.prototype.forEach.call(document.getElementsByClassName('ui-autocomplete'), function(target){
        target.style.display = 'none';
      });
    }
  }

  componentDidMount(){
    window.addEventListener('resize', () => {
      this.setInputPosition();
    });
  }

  render(){
    const { type, srcCities, dstCities, inputPosition, srcUlStyle, dstUlStyle, srcCity, srcCityShadow, dstCity, dstCityShaodw } = this.state;
    const { tripTypeClick, handleKeyUp, handleChange, handleClick, handleBlur, handleListClick } = this;
    const srcCityList = srcCities.map(
      (city) => (
          <li key={city.id} className="ui-menu-item" id={`ui-id-${city.id}`} tabIndex="-1" onClick={(e) => this.handleListClick('src', city)}>
            <a>
              <span className="autocomplete-em">{city.iataCode}</span>
              {city.name}
            </a>
          </li>
        )
    );
    const dstCityList = dstCities.map(
      (city) => (
          <li key={city.id} className="ui-menu-item" id={`ui-id-${city.id}`} tabIndex="-1" onClick={() => this.handleListClick('dst', city)}>
            <a>
              <span className="autocomplete-em">{city.iataCode}</span>
              {city.name}
            </a>
          </li>
        )
    );
    return(
      <form className="flight-search-form ui-front">
        <div className="trip-type-selection">
          <button type="button" className={`trip-type ${type === 'rt'? 'active-trip': ''}`} onClick={() => this.tripTypeClick("rt")}>Round Trip</button>
          <button type="button" className={`trip-type ${type === 'ow'? 'active-trip': ''}`} onClick={() => this.tripTypeClick("ow")}>One Way</button>
        </div>
        <div className="form-row">
          <div className="trip-row" onClick={handleClick} onBlur={this.handleBlur}>
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
              <label className="input-label date-input-label">
                <span className="input-label-text">Return</span>
                <input type="text" className="date-input end-date hasDatepicker" placeholder="Return" readOnly />
              </label>
            </div>
          </div>
        </div>
        <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-1" tabIndex="0" style={srcUlStyle}>
          {srcCityList}
        </ul>
        <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-2" tabIndex="0" style={dstUlStyle}>
          {dstCityList}
        </ul>
      </form>
    );
  }
}

export default Main_Search_Input;
