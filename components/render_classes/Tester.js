import React, {Component} from 'react'

class Tester extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <h1 className="heading" isBoolean lastName={'Poetic'}>Hello, world!</h1>
                    <nav className="nav">
                        <ul className="list">
                            <li className="list-item">#1</li>
                            <li className="list-item">#2</li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Tester
