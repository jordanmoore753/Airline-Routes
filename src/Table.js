import React, { Component } from 'react';
import data from './data';

const helpers = data.helpers;

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="routes-table">
        <thead>
          <tr>
            {this.props.columns.map(function(col, i) {
              return (
                <th key={i}>
                  {col.name}
                </th>
              );
            })}   
          </tr>
        </thead>
        <tbody>
        {this.props.routes.map(function(route, i) {
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