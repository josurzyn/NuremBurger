import React, { Component } from 'react'

class Filter extends Component {
  render() {
    return (
      <div className="filters">
        <div className="filter-options">
          <h3>Filter options</h3>
          <div className="open-now-filter">
            <button className="filter-button" onClick={this.props.filterByOpenNow}>Open now</button>
            {this.props.openFilterSelected === true &&
                <button className="remove-filter-btn" onClick={this.props.showMarkers}>Clear selection</button>
            }
          </div>
          <select className="select-price" value={this.props.priceFilter.select} onChange={(event) => this.props.filterByPrice(event.target.value)}>
            <option value="none" disabled>Select price range...</option>
            <option value="1">€</option>
            <option value="2">€€</option>
            <option value="3">€€€</option>
            <option value="clear">Clear</option>
          </select>
          <select className="select-rating" value={this.props.ratingFilter.select} onChange={(event) => this.props.filterByRating(event.target.value)}>
            <option value="none" disabled>Select minimum rating...</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="clear">Clear</option>
          </select>
          <button className="filter-button" onClick={this.props.showMarkers}>Show all</button>
          <button className="filter-button" onClick={this.props.hideMarkers}>Hide all</button>
          </div>
          <div className="filters-close">
            <button className="close-btn-light close-filter-info" onClick={this.props.handleFiltersClose}></button>
          </div>
      </div>
    )
  }
}

export default Filter
