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

const airlinesByName = {};
const airportsByName = {};

const humanizedRoutes = routes.map(function(route) {
  return {
    airline: helpers.getAirlineById(route.airline).name,
    dest: helpers.getAirportByCode(route.dest).name,
    src: helpers.getAirportByCode(route.src).name
  };
});

const filteredAirlines = airlines.map(function(airline) {
  airlinesByName[airline.name] = airline.id;

  return {
    name: airline.name,
    value: airline.id
  };
});

const filteredAirports = airports.map(function(airport) {
  airportsByName[airport.name] = airport.code;

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
      selectedRoutes: humanizedRoutes,
      filteredAirlines: filteredAirlines,
      filteredAirports: filteredAirports,
      selectedAirline: '',
      selectedAirport: ''
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

  updateSelectedAirline = (name) => {
    this.setState({ selectedAirline: airlinesByName[name] || '' }, function () {
      this.updateRoutes();
    });
    
  };

  updateSelectedAirport = (name) => {
    this.setState({ selectedAirport: airportsByName[name] || '' }, function () {
      this.updateRoutes();
    });
  };

  updateRoutes = () => {
    const airlineId = this.state.selectedAirline;
    const airportCode = this.state.selectedAirport;

    let filteredRoutes = routes;

    if (airlineId !== '') {
      filteredRoutes = filteredRoutes.filter((route) => route.airline === airlineId);
    } else {
      filteredRoutes = routes;
    }

    if (airportCode !== '') {
      filteredRoutes = filteredRoutes.filter((route) => route.dest === airportCode || route.src === airportCode);
    }

    let availableAirlines = [];
    let availableAirports = [];
    let airlineHash = {};
    let airportHash = {};
    let nameOfAL;
    let nameofAP;

    filteredRoutes = filteredRoutes.map(function(route) {
      let nameOfAL = helpers.getAirlineById(route.airline).name;

      if (airlineHash[route.airline] === undefined) {
        airlineHash[route.airline] = true;

        availableAirlines.push({
          name: nameOfAL,
          value: route.airline
        });
      }

      let nameofAPDest = helpers.getAirportByCode(route.dest).name;

      if (airportHash[route.dest] === undefined) {
        airportHash[route.dest] = true;

        availableAirports.push({
          name: nameofAPDest,
          value: route.dest
        });
      }

      let nameofAPSrc = helpers.getAirportByCode(route.src).name;

      if (airportHash[route.src] === undefined) {
        airportHash[route.src] = true;

        availableAirports.push({
          name: nameofAPSrc,
          value: route.src
        });
      }

      return {
        airline: nameOfAL,
        dest: nameofAPDest,
        src: nameofAPSrc
      };
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
          <Select 
            options={this.state.filteredAirlines}
            value={this.state.selectedAirline}
            titleKey="name"
            allTitle="All Airlines"
            onSelect={this.updateSelectedAirline}
          />
          <Select 
            options={this.state.filteredAirports}
            value={this.state.selectedAirport}
            titleKey="name"
            allTitle="All Airports"
            onSelect={this.updateSelectedAirport}
          />
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