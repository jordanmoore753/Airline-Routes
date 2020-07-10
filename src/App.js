import React, { Component } from 'react';
import Table from './Table';
import Nav from './Nav';

import './App.css';
import data from './data';

const helpers = data.helpers;
const routes = data.routes;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      selectedAirline: null,
      selectedAirport: null,
      maxPage: null
    };
  }

  nextPage = () => {
    if (this.state.currentPage === this.state.maxPage) {
      return;
    }

    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  prevPage = () => {
    if (this.state.currentPage === 1) {
      return;
    }

    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table 
            page={this.state.currentPage}
            routes={routes}
          />
          <Nav 
            prevPage={this.prevPage}
            nextPage={this.nextPage}
          />
        </section>
      </div>
    );
  }
}

export default App;