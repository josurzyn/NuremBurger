import React, { Component } from 'react'

class Options extends Component {
  render() {
    return(
      <div className="option-buttons">
        <button className="list-view-btn" onClick={this.props.handleListOpen} aria-label="Open list of locations">List</button>
        {this.props.showFilterOptions &&
          <button className="filter-btn" onClick={this.props.handleFiltersOpen} aria-label="Open filter options">Filters</button>
        }
        <button className="reset-btn" onClick={this.props.handleReset} aria-label="Reset the map">Reset</button>
      </div>
    )
  }
}

export default Options
