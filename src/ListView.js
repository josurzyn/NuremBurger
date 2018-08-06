import React, { Component } from 'react'

class ListView extends Component {
  render() {
    return (
          <div className="list-open-view">
            <button className="close-btn-light close-list-view" onClick={this.props.handleListClose}></button>
            <ul className="-list">
              {this.props.markers.filter(marker => marker.map != null)
                .map((marker) => (
                <li key={marker.id} className="marker-list-item">
                  <button onClick={() => this.props.handleItemClick(marker)}>{marker.title}</button>
                </li>
              ))}
            </ul>
        </div>
      )
    }
}

export default ListView
