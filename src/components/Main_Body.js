import React, { Component } from 'react';

class Main_Body extends Component{
  render(){
    return(
      <div className="skip-deals">
        <div className="deal-container" style={{position: 'static', zoom: '1'}}>
          <ul>
            
          </ul>
        </div>
        <div>{this.props.type}</div>
        <div>{this.props.srcCity}</div>
        <div>{this.props.dstCity}</div>
      </div>
    );
  }
}

export default Main_Body;
