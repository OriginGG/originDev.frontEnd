import React from "react";

class Test extends React.Component {
  render() {
    return (
      <div data-insert-props="{onClick={this.handleClick}">
        <header className="header">
          <h1 className="heading">Hello, world!</h1>
          <p data-replace-content="{this.props.arse}">Hola</p>
          <nav className="nav">
            <ul className="list">
              <li className="list-item">#1</li>
              <li className="list-item">#2</li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Test;
