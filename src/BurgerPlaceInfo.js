import React, { Component } from 'react'

class BurgerPlaceInfo extends Component {
  render() {
    const { burgerPlace } = this.props

    return(
      <div className="burger-place-info">
        <h2>This is a burger space</h2>
        <h3>{burgerPlace.name}</h3>
        <p>{burgerPlace.url}</p>
      </div>
    )
  }
}

export default BurgerPlaceInfo
