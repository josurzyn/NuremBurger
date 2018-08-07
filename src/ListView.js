import React, { Component } from 'react'

class ListView extends Component {
  render() {
    return (
          <div className="list-view">
            <section className="list-title">
              <h3 className="list-h3">Burger Joints</h3>
              <p>Select a restaurant for more information</p>
            </section>
            <button className="close-btn-dark close-list-view" onClick={this.props.handleListClose} aria-label="Close list of locations"></button>
            <ul className="list">
              {this.props.markers.filter(marker => marker.map != null)
                .map((marker) => (
                <li key={marker.id} className="marker-list-item">
                  <button className="list-item-btn" onClick={() => this.props.handleItemClick(marker)} aria-label={"Open more information about " + marker.title}>{marker.title}</button>
                </li>
              ))}
            </ul>
        </div>
      )
    }
}

export default ListView
