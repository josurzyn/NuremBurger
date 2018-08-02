import React, { Component } from 'react'

class ListView extends Component {
  render() {
    return (
      <div className="list-view">
        <h3>List view</h3>
        <ul>
          {this.props.markers.map((marker) => (
            <li key={marker.id} className="marker-list-item">
              <p>{marker.title}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default ListView
