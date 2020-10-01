import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class NavBarComponent extends React.Component {
  Home() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
  
  Success() {
    return (
      <div>
        <h2>Success!</h2>
      </div>
    );
  }

  render() {
    return (
      <div className="NavBar">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <hr />
            <Switch>
              <Route exact path="/">
                <this.Home />
              </Route>
              <Route path="/success">
                <this.Success />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default NavBarComponent;
