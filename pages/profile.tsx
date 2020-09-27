import React, { Component } from 'react';
import NavBarComponent from '../src/components/NavBarComponent';
import ProfileComponent from '../src/components/ProfileComponent';

class Profile extends Component {
  render() {
    return (
    <div>
      <NavBarComponent />
      <ProfileComponent />
    </div>    
    )
  }
}

export default Profile;