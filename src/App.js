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

airportsByName[''] = '';
airlinesByName[''] = '';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      perPage: 25,
      selectedRoutes: humanizedRoutes,
      filteredAirlines: filteredAirlines,
      filteredAirports: filteredAirports,
      selectedAirline: '',
      selectedAirport: ''
    };
  }

  clearFilters = () => {
    this.setState({
      selectedAirline: '',
      selectedAirport: ''
    }, function () {
      this.updateRoutes();
    });
  };

  nextPage = () => {
    if (this.state.currentPage === Math.ceil(this.state.selectedRoutes.length / this.state.perPage)) {
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
    if (name === 'All Airlines') {
      name = '';
    }
    this.setState({ selectedAirline: name || '' }, function () {
      this.updateRoutes();
    });
    
  };

  updateSelectedAirport = (name) => {
    if (name === 'All Airports') {
      name = '';
    }

    this.setState({ selectedAirport: name || '' }, function () {
      this.updateRoutes();
    });
  };

  updateRoutes = () => {
    const airlineId = airlinesByName[this.state.selectedAirline];
    const airportCode = airportsByName[this.state.selectedAirport];

    let filteredRoutes = routes;

    if (airlineId !== '') {
      filteredRoutes = filteredRoutes.filter((route) => route.airline === airlineId);
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
          value: route.airline,
          disabled: false
        });
      }

      let nameofAPDest = helpers.getAirportByCode(route.dest).name;

      if (airportHash[route.dest] === undefined) {
        airportHash[route.dest] = true;

        availableAirports.push({
          name: nameofAPDest,
          value: route.dest,
          disabled: false
        });
      }

      let nameofAPSrc = helpers.getAirportByCode(route.src).name;

      if (airportHash[route.src] === undefined) {
        airportHash[route.src] = true;

        availableAirports.push({
          name: nameofAPSrc,
          value: route.src,
          disabled: false
        });
      }

      return {
        airline: nameOfAL,
        dest: nameofAPDest,
        src: nameofAPSrc
      };
    });

    airlines.forEach(function(airline) {
      if (!airlineHash[airline.id]) {
        availableAirlines.push({
          name: airline.name,
          value: airline.id,
          disabled: true
        });
      }
    });

    airports.forEach(function(airport) {
      if (!airportHash[airport.code]) {
        availableAirports.push({
          name: airport.name,
          value: airport.code,
          disabled: true
        });
      }      
    });

    availableAirports.sort((a, b) => a > b );
    
    this.setState({
      selectedRoutes: filteredRoutes,
      filteredAirlines: availableAirlines,
      filteredAirports: availableAirports,
      currentPage: 1
    });
  };

  numberOfPages = (totalRoutes) => {
    return Math.ceil(totalRoutes / 25);
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
          <p>
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
            <button
              onClick={this.clearFilters}
              disabled={this.state.selectedAirline === '' && this.state.selectedAirport === ''}
            >
              Clear Filters
            </button>
          </p>
          <Table 
            columns={columns}
            routes={this.state.selectedRoutes}
            perPage={this.state.perPage}
            currentPage={this.state.currentPage}
            prevPage={this.prevPage}
            nextPage={this.nextPage}
          />
        </section>
      </div>
    );
  }
}

export default App;