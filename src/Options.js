import React, { Component } from 'react'

class Options extends Component {
  render() {
    return(
      <div className="option-buttons">
        <button className="list-view-btn" onClick={this.props.handleListOpen}>List</button>
        <button className="filter-btn" onClick={this.props.handleFiltersOpen}>Filters</button>
        <button className="reset-btn" onClick={this.props.handleReset}>Reset all</button>
      </div>
    )
  }
}

export default Options
