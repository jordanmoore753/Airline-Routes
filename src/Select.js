import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
  }

  optionChange = (e) => {
    this.props.onSelect(e.target.value);
  };

  render() {
    return (
      <div className="select-filter">
        <select
          value={this.props.value}
          name={this.props.titleKey}
          onChange={this.optionChange}
        >
          <option value={this.props.allTitle}>{this.props.allTitle}</option>
          {this.props.options.map(function(option, i) {
            return (
              <option
                key={i}
                value={option.name}
                disabled={option.disabled}
              >
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    );   
  }
}

export default Select;

/*

change Select to state
need to change how the state is stored on App
Right now it stores the id
The id needs to become the name so that the name can be transmitted
to the Select
same with the code, needs to be the name of the airport instead

in the updateRoutes method, get the id of the airline/airport 
by accessing the relevant hash O(1)

*/