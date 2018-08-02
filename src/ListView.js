import React, { Component } from 'react'

class ListView extends Component {
  render() {
    return (
      <div className="list-view">
        <button onClick={this.props.handleListOpen}>List view</button>
        {this.props.listVisible && (
          <div className="list-view">
            <button className="close-list-view" onClick={this.props.handleListClose}></button>
            <ul>
              {this.props.markers.map((marker) => (
                <li key={marker.id} className="marker-list-item">
                  <button onClick={() => this.props.handleItemClick(marker)}>{marker.title}</button>
                </li>
              ))}
            </ul>
        </div>
        )}
      </div>
    )
  }
}

export default ListView
