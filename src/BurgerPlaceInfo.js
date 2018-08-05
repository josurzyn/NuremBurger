import React, { Component } from 'react'

class BurgerPlaceInfo extends Component {

  render() {
    const { burgerPlace } = this.props
    //console.log(burgerPlace)

    return(

      <div className="burger-place-info">
        {this.props.showPlace && (
          <div className="info-open">
            <button className="close-btn-dark close-place-info" onClick={this.props.handleInfoClose}></button>
            <address className="place-address">
              <h3>{burgerPlace.name}</h3>
              <a href={burgerPlace.url}>{burgerPlace.url}</a>
              <p>{burgerPlace.phone}</p>
              <p>{burgerPlace.address}</p>
            </address>
            <p className="open-status">{burgerPlace.openStatus}</p>
            <p className="price">{burgerPlace.price}</p>
            <p className="rating">{burgerPlace.rating}/10</p>
            <div className="info-open-img">
              <img className="place-best-img" src={burgerPlace.photo} alt={burgerPlace.name}/>
            </div>
        </div>
        )}
      </div>

    )
  }
}

export default BurgerPlaceInfo
