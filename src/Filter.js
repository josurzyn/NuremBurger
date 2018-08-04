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
        <select className="select-price" value="choose" onChange={(event) => this.props.filterByPrice(event.target.value)}>
          <option value="choose" disabled>Select price...</option>
          <option value="1">€</option>
          <option value="2">€€</option>
          <option value="3">€€€</option>
        </select>
      </div>
    )
  }
}

export default Filter
