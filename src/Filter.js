import React, { Component } from 'react'

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <div className="filter-options">
          <h3>Filter options</h3>
          <button className="filter-button" onClick={this.props.hideMarkers}>Hide all</button>
          <button className="filter-button" onClick={this.props.showMarkers}>Show all</button>
          <button className="filter-button" onClick={this.props.filterByOpenNow}>Open now</button>
          <select className="select-price" value="choose" onChange={(event) => this.props.filterByPrice(event.target.value)}>
            <option value="choose" disabled>Select price...</option>
            <option value="1">€</option>
            <option value="2">€€</option>
            <option value="3">€€€</option>
          </select>
          <select className="select-rating" value="choose" onChange={(event) => this.props.filterByRating(event.target.value)}>
            <option value="choose" disabled>Select minimum rating...</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          </div>
          <div className="filters-close">
            <button className="close-btn-light close-filter-info" onClick={this.props.handleFiltersClose}></button>
          </div>
      </div>
    )
  }
}

export default Filter
