import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1 className="heading">Hello, world!</h1>
        <nav className="nav">
          <ul className="list">
            <li className="list-item">#1</li>
            <li className="list-item">#2</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
