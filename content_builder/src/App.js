import React, { Component } from 'react';
import injectSheet, { ThemeProvider } from 'react-jss'
import './App.css';
import { GlobalTheme, GlobalStyles }  from './html/Theme'; 
// import TestComponentRender from './components/LoginComponentRender.js';
import TestComponentRender from './components/CardComponentRender.js';



const TestComponent = injectSheet(GlobalStyles)(TestComponentRender)


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={GlobalTheme}>
        <div className="App">
            <TestComponent />
        </div>
      </ThemeProvider>  
    );
  }
}

export default App;
