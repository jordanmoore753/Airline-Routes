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
      <div>
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
                value={option.id}
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