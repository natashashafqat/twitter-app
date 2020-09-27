import React, { Component } from 'react';
import NavBarComponent from '../src/components/NavBarComponent';
import TimelineComponent from '../src/components/TimelineComponent';

class Timeline extends Component {
  render() {
    return (
      <div>
        <NavBarComponent />
        <TimelineComponent />
      </div>    
      )
  }
}

export default Timeline;