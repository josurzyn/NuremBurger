import React, { Component } from 'react'

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <h3>Filter options</h3>
        <button className="hide-filters" onClick={this.props.handleFiltersClose}></button>
      </div>
    )
  }
}

export default Filter
