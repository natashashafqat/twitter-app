import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import NavBarComponent from './NavBarComponent';
require('dotenv').config({ path: __dirname+'/.env' });

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
      token: 'test'
    };
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    if (token) {
      response.json().then(user => {
        this.setState({isAuthenticated: true, user: user, token: token});
      });
    }
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  render() {
    let content;
    if (this.state.isAuthenticated) {
      content =
      (
        <div>
          <NavBarComponent />
          <p>Authenticated!</p>
          <div>
            <p>Email: {this.state.user ? this.state.user.email : ''}</p>
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      )
    }
    else {
      content =
        (
          <div>
            <NavBarComponent />
            <div>
              <p>Email: {this.state.user ? this.state.user.email : ''}</p>
            </div>
  
            <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
            onFailure={this.onFailed}
            onSuccess={this.onSuccess}
            requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
            showIcon={true}
            forceLogin={true}/>
          </div>
        )
    }
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;