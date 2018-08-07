import React, { Component } from 'react'

class Filter extends Component {
  componentDidMount() {
    this.filterFocus.focus()
  }

  render() {
    return (
      <div className="filters">
        <div className="filter-options">
          <h3>Filter options</h3>
          <div className="filters-close">
            <button className="close-btn-dark close-filter-info" onClick={this.props.handleFiltersClose} aria-label="Close filters window" ref={(filterFocus) => { this.filterFocus = filterFocus }}></button>
          </div>
          <div className="open-now-filter">
            <button className="filter-button" onClick={this.props.filterByOpenNow} aria-label="Filter by open now">Open now</button>
            {this.props.openFilterSelected === true &&
              <button className="remove-filter-btn" onClick={this.props.clearOpenFilter} aria-label="Clear open now filter">Clear</button>
            }
          </div>
          <select className="select-price" value={this.props.priceFilter.select} onChange={(event) => this.props.filterByPrice(event.target.value)} role="list" aria-label="Filter by price tier">
            <option value="none" disabled>Select price range...</option>
            <option value="1" role="listitem">€</option>
            <option value="2" role="listitem">€€</option>
            <option value="3" role="listitem">€€€</option>
            <option value="clear" role="listitem">Clear</option>
          </select>
          <select className="select-rating" value={this.props.ratingFilter.select} onChange={(event) => this.props.filterByRating(event.target.value)} role="list" aria-label="Filter by average rating">
            <option value="none" disabled>Select minimum rating...</option>
            <option value="5" role="listitem">5</option>
            <option value="6" role="listitem">6</option>
            <option value="7" role="listitem">7</option>
            <option value="8" role="listitem">8</option>
            <option value="9" role="listitem">9</option>
            <option value="clear" role="listitem">Clear</option>
          </select>
          <button className="filter-button" onClick={this.props.showMarkers} aria-label="Show all burger joints">Show all</button>
          <button className="filter-button" onClick={this.props.hideMarkers} aria-label="Hide all burger joints">Hide all</button>
          </div>
      </div>
    )
  }
}

export default Filter
