import React from 'react'
import Foursquare from './imgs/powered-by-foursquare-white.svg'

function Header() {
  return (
    <div className="header">
      <h1>NuremBurger</h1>
      <img src={Foursquare} alt="Powered by Foursquare" className="powered-by-foursquare"/>
    </div>
  )
}

export default Header
