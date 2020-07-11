import React, { Component } from 'react';
import Table from './Table';
import Nav from './Nav';
import Select from './Select';

import './App.css';
import data from './data';

const helpers = data.helpers;
const routes = data.routes;
const airlines = data.airlines;
const airports = data.airports;

const humanizedRoutes = routes.map(function(route) {
  return {
    airline: helpers.getAirlineById(route.airline).name,
    dest: helpers.getAirportByCode(route.dest).name,
    src: helpers.getAirportByCode(route.src).name
  };
});

const filteredAirlines = airlines.map(function(airline) {
  return {
    name: airline.name,
    value: airline.id
  };
});

const filteredAirports = airports.map(function(airport) {
  return {
    name: airport.name,
    value: airport.code
  };
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      maxPage: Math.ceil(routes.length / 25),
      selectedAirline: '',
      selectedAirport: '',
      selectedRoutes: humanizedRoutes,
      filteredAirlines: filteredAirlines,
      filteredAirports: filteredAirports
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

  updateSelectedAirline = (id) => {
    this.setState({ selectedAirline: id });
    this.updateRoutes(); // change filtered routes
  };

  updateSelectedAirport = (code) => {
    this.setState({ selectedAirport: code });
    this.updateRoutes(); // change filtered routes
  };

  updateRoutes = () => {
    const airlineId = helpers.getAirlineById(this.state.selectedAirline);
    const airportCode = helpers.getAirportByCode(this.state.selectedAirport);

    let filteredRoutes = routes;

    if (airlineId !== null) {
      filteredRoutes = filteredRoutes.filter((route) => route.airline === airlineId);
    }

    if (airportCode !== null) {
      filteredRoutes = filteredRoutes.filter((route) => route.dest === airportCode || route.src === airportCode);
    }

    let availableAirlines = [];
    let availableAirports = [];
    let airlineHash = {};
    let airportHash = {};
    let nameOfAL;
    let nameofAP;

    filteredRoutes.forEach(function(route) {
      nameOfAL = helpers.getAirlineById(route.airline).name;

      if (airlineHash[route.airline] === undefined) {
        airlineHash[route.airline] = true;

        availableAirlines.push({
          name: nameOfAL,
          value: route.airline
        });
      }

      nameofAP = helpers.getAirportByCode(route.dest).name;

      if (airportHash[route.dest] === undefined) {
        airportHash[route.dest] = true;

        availableAirports.push({
          name: nameofAP,
          value: route.dest
        });
      }

      nameofAP = helpers.getAirportByCode(route.src).name;

      if (airportHash[route.src] === undefined) {
        airportHash[route.src] = true;

        availableAirports.push({
          name: nameofAP,
          value: route.src
        });
      }
    });

    this.setState({
      selectedRoutes: filteredRoutes,
      filteredAirlines: availableAirlines,
      filteredAirports: availableAirports
    });
  };

  numberOfPages = (totalRoutes) => {
    return Math.ceil(totalRoutes / 25);
  };

  paginate = () => {
    const lowRouteIndex = this.state.currentPage * 25 - 25;
    const highRouteIndex = lowRouteIndex + 25;

    return this.state.selectedRoutes.slice(lowRouteIndex, highRouteIndex);
  };

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table 
            columns={columns}
            routes={this.paginate()}
          />
          <Nav
            prevPage={this.prevPage}
            nextPage={this.nextPage}
            currentPage={this.state.currentPage}
            maxPage={this.state.maxPage}
          />
        </section>
      </div>
    );
  }
}

export default App;