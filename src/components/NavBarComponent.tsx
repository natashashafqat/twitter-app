import React from 'react';
import Link from 'next/link';

class NavBarComponent extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
        <Link href="/timeline">
          <a>Timeline</a>
        </Link>
      </div>
    );
  }
}

export default NavBarComponent;
