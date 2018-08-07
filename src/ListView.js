import React, { Component } from 'react'

class ListView extends Component {
  componentDidMount() {
    // When list view mounts, set focus in component at natural start order
    this.listFocus.focus()
  }

  render() {
    return (
          <div className="list-view">
            <button className="close-btn-dark close-list-view" onClick={this.props.handleListClose} aria-label="Close list of locations" ref={(listFocus) => {this.listFocus = listFocus}}></button>
            <section className="list-title">
              <h3 className="list-h3">Burger Joints</h3>
              <p>Select a restaurant for more information</p>
            </section>
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
