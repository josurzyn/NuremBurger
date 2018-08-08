import React, { Component } from 'react'

class BurgerPlaceInfo extends Component {
  componentDidMount() {
    if (this.props.burgerPlace) {
      this.infoFocus.focus()
    }
  }

  render() {
    const { burgerPlace } = this.props

    return(

      <div className="burger-place-info">
        {burgerPlace ?
          <div className="info-open">
            <button className="close-btn-dark close-place-info" onClick={this.props.handleInfoClose} aria-label="Close location information" ref={(infoFocus) => { this.infoFocus = infoFocus }}></button>
            <div className="details-container">
              <address className="place-address">
                <h3>{burgerPlace.name}</h3>
                <a href={burgerPlace.url} target="_blank">{burgerPlace.url}</a>
                <p>{burgerPlace.phone}</p>
                <p>{burgerPlace.address}</p>
              </address>
              <p className="open-status">{burgerPlace.openStatus}</p>
              <a href={burgerPlace.foursquarePage} className="foursquare-link" target="_blank" aria-label={"View " + burgerPlace.name + " on Foursquare"}>View on Foursquare</a>
              <p className="price">{burgerPlace.price}</p>
              <p className="rating">{burgerPlace.rating}/10</p>
            </div>
          </div>
          : <p>Due to an API error, we don't have any additional details. Why not take a trip there and see?</p>
        }
        {burgerPlace && burgerPlace.photo ?
          <div className="info-open-img">
            <img className="place-best-img" src={burgerPlace.photo} alt={burgerPlace.name + " burger restaurant"}/>
          </div>
        : <p>No photo available.</p>
        }
      </div>
    )
  }
}

export default BurgerPlaceInfo
