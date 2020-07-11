import React, { Component } from 'react';
import Nav from './Nav';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  paginate = () => {
    const lowRouteIndex = this.props.currentPage * this.props.perPage - this.props.perPage;
    const highRouteIndex = lowRouteIndex + this.props.perPage;

    return this.props.routes.slice(lowRouteIndex, highRouteIndex);
  };

  render() {
    const paginatedRoutes = this.paginate();
    const maxPage = this.props.routes.length / this.props.perPage < 1 ? 1 : this.props.routes.length / this.props.perPage; 

    return (
      <div>
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
          {paginatedRoutes.map(function(route, i) {
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
        <Nav
          prevPage={this.props.prevPage}
          nextPage={this.props.nextPage}
          currentPage={this.props.currentPage}
          perPage={this.props.perPage}
          maxPage={this.props.routes.length}
        />
      </div>
    );
  }
}

export default Table;