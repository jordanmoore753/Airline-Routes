import React, { Component } from 'react';
import data from './data';

const helpers = data.helpers;

class Table extends Component {
  constructor(props) {
    super(props);

    this.humanizeData = this.humanizeData.bind();
  }

  humanizeData(props) {
    const lo = props.page * 25 - 25;
    const hi = lo + 24;
    const humanizedRoutes = [];
    const routes = props.routes;

    let currentRoute;

    for (let i = lo; i < hi; i += 1) {
      currentRoute = {
        airline: helpers.getAirlineById(routes[i].airline).name,
        src: helpers.getAirportByCode(routes[i].src).name,
        dest: helpers.getAirportByCode(routes[i].dest).name
      };

      humanizedRoutes.push(currentRoute);
    }

    return humanizedRoutes;
  }

  render() {
    const data = this.humanizeData(this.props);

    return (
      <table className="routes-table">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>      
          </tr>
        </thead>
        <tbody>
        {data.map(function(route, i) {
          return (
            <tr key={i}>
              <td>{route.airline}</td>
              <td>{route.src}</td>
              <td>{route.dest}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }
}

export default Table;