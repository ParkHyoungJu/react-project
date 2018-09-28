import React, { Component } from 'react';

class Main_Search_Input extends Component{

  state = {
    type: 'rt'
  }

  switchType = (selectedType) => {
    this.setState({
      type: selectedType
    })
  }

  change

  render(){
    const { type } = this.state;
    return(
      <form className="flight-search-form ui-front">
        <div className="trip-type-selection">
          <button type="button" data-trip-type="rt" className="trip-type active-trip">Round Trip</button>
          <button type="button" data-trip-type="ow" className="trip-type">One Way</button>
        </div>
        <div className="form-row">
          <div className="trip-row">
            <label className="input-label location-input">
              <span className="input-label-text">From</span>
              <input type="text" className="src-input" placeholder="" value="SEL" data-shadow="Gimpo Intl Airpot, Seoul, South Korea" readOnly/>
              <div className="input-shadow">
                <span className="truncate">Gimpo Intl Airpot, Seoul, South Korea</span>
              </div>
              <span className="input-icon hidden" data-toggle="tooltip" data-placement="bottom" title="Swap origin and destination">
                <i className="retina-icon-swap"/>
              </span>
            </label>
            <label className="input-label location-input">
              <span className="input-label-text">To</span>
              <input type="text" className="dst-input" placeholder="" value="" data-shadow="Anywhere"/>
              <div className="input-shadow">
                <span className="truncate">Anywhere</span>
              </div>
              <span className="input-icon" data-toggle="tooltip" title="Fly anywhere">
                <i className="retina-icon-globe"/>
              </span>
            </label>

          </div>
        </div>
      </form>
    );
  }
}

export default Main_Search_Input;
