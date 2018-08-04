import React, { Component } from 'react'
import Filter from './Filter.js'

class ListView extends Component {
  render() {
    return (
      <div className="list-view">
        <div className="list-buttons">
          <button className="list-view-btn" onClick={this.props.handleListOpen}>List view</button>
          <button className="filter-btn" onClick={this.props.handleFiltersOpen}>Filter Results</button>
        </div>
        {this.props.listVisible && (
          <div className="list-open-view">
            <button className="close-list-view" onClick={this.props.handleListClose}></button>
            <ul className="-list">
              {this.props.markers.filter(marker => marker.map != null)
                .map((marker) => (
                <li key={marker.id} className="marker-list-item">
                  <button onClick={() => this.props.handleItemClick(marker)}>{marker.title}</button>
                </li>
              ))}
            </ul>
        </div>
        )}
        {this.props.showFilters && (
          <Filter
            handleFiltersClose={this.props.hideFilters}
            hideMarkers={this.props.hideMarkers}
            showMarkers={this.props.showMarkers}
            filterByOpenNow={this.props.filterByOpenNow}
            filterByPrice={this.props.filterByPrice}
            filterByRating={this.props.filterByRating}
          />
        )}
      </div>
    )
  }
}

export default ListView
