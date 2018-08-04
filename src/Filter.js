import React, { Component } from 'react'

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <h3>Filter options</h3>
        <button className="hide-filters" onClick={this.props.handleFiltersClose}></button>
        <button onClick={this.props.hideMarkers}>Hide all</button>
        <button onClick={this.props.showMarkers}>Show all</button>
        <button onClick={this.props.filterByOpenNow}>Open now</button>
      </div>
    )
  }
}

export default Filter
