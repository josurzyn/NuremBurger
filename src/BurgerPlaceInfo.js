import React, { Component } from 'react'

class BurgerPlaceInfo extends Component {

  render() {
    const { burgerPlace } = this.props
    //console.log(burgerPlace)

    return(

      <div className="burger-place-info">
          <div className="info-open">
            <button className="close-btn-dark close-place-info" onClick={this.props.handleInfoClose} aria-label="Close location information"></button>
            <div className="details-container">
              <address className="place-address">
                <h3>{burgerPlace.name}</h3>
                <a href={burgerPlace.url}>{burgerPlace.url}</a>
                <p>{burgerPlace.phone}</p>
                <p>{burgerPlace.address}</p>
              </address>
              <p className="open-status">{burgerPlace.openStatus}</p>
              <p className="price">{burgerPlace.price}</p>
              <p className="rating">{burgerPlace.rating}/10</p>
            </div>
          </div>
          <div className="info-open-img">
            <img className="place-best-img" src={burgerPlace.photo} alt={burgerPlace.name + " burger joint"}/>
          </div>
      </div>

    )
  }
}

export default BurgerPlaceInfo
