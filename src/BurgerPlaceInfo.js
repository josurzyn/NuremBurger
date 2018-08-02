import React, { Component } from 'react'

class BurgerPlaceInfo extends Component {

  render() {
    const { burgerPlace } = this.props
    //console.log(burgerPlace)

    return(

      <div className="burger-place-info">
        {this.props.showPlace && (
          <div>
          <button className="close-place-info" onClick={this.props.handleInfoClose}></button>
          <address>
            <h3>{burgerPlace.name}</h3>
            <a href={burgerPlace.url}>{burgerPlace.url}</a>
            <p>{burgerPlace.phone}</p>
            <p>{burgerPlace.address}</p>
          </address>
          <p>{burgerPlace.price}</p>
          <p>{burgerPlace.rating}/10</p>
          <img src={burgerPlace.photo} alt={burgerPlace.name}/>
        </div>
        )}
      </div>

    )
  }
}

export default BurgerPlaceInfo
