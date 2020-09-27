import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="App">
        <a href="/profile">Profile</a>
        <a href="/timeline">Timeline</a>
        <header className="App-header">
          <p>
            Welcome to your test React x Next.js app.
          </p>
        </header>
      </div>
    );
  }
}

export default AppComponent;
