import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  optionChange = (e) => {
    const context = this;
    const value = e.target.value;

    this.setState({ value: e.target.value }, function () {
      context.props.onSelect(value);
    });
  };

  render() {
    return (
      <div>
        <select
          value={this.state.value}
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