import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Map from './Map.js'
import BurgerPlaceInfo from './BurgerPlaceInfo.js'
import ListView from './ListView.js'
import Filter from './Filter.js'
import Options from './Options.js'

class App extends Component {
  state = {
      locations: [],
      markers: [],
      map: null,
      selectedMarker: [],
      showList: false,
      showPlace: false,
      showFilters: false,
      openFilter: false,
      priceFilter: {
          applied: false,
          select: "none"
        },
      ratingFilter: {
          applied: false,
          select: "none"
        },
      showOptions: true,
      showFilterOptions: true
    }

  setMap = (map) => {
    this.setState({ map })
  }

  fetchFoursquareVenues = () => {
    // Fetch recommended venues for 'burgers' using Foursquare Recommended Venues API call
    fetch('https://api.foursquare.com/v2/venues/explore?ll=49.452102,11.076665&query=burgers&limit=10&client_id=FO1J3EFVMOXJGRR2AFBHABINFZXXD2MOZXUZ4VA5RUKI0IFC&client_secret=VWWOO2BDCQ0FBY5JA1RMSFFRAJN1IDWOA4G0PGT0300EFCVW&v=20180731')
    .then((response) => response.json())
    .then((responseJson) => {
      // Get list of venues from response
      var venues = responseJson.response.groups[0].items
      var locations = []
      // Pull relevant venue information and create location from response
      for (var i = 0; i < venues.length; i++) {
        const name = venues[i].venue.name;
        const id = venues[i].venue.id;
        const address = venues[i].venue.location.address;
        const lat = venues[i].venue.location.lat;
        const lng = venues[i].venue.location.lng;
        const location = {
          name: name,
          id: id,
          address: address,
          location: {
            lat: lat,
            lng: lng
          }
        }
        // Add location to temp array
        locations.push(location);
      }
      /**
       * Set location state with new locations array built from Foursquare API,
       * then create set markers for all locations
       */
      this.setState({ locations: locations }, () => {this.updateMarkers(this.state.locations)})
    })
    // Catch errors
    .catch((error) => {
      window.alert('Oh no! There was a problem loading the intial data for Nuremburger - ' + error + ' - Try reloading the page, or come visit us later.')
      console.log(error);
    })
  }

  // Populate additional location info using Foursquare Venue Details API call
  populateLocationsInfo = () => {
    const locationsInfo = []
    for (let i = 0; i < this.state.locations.length; i++) {
      fetch('https://api.foursquare.com/v2/venues/' + this.state.locations[i].id + '?&client_id=FO1J3EFVMOXJGRR2AFBHABINFZXXD2MOZXUZ4VA5RUKI0IFC&client_secret=VWWOO2BDCQ0FBY5JA1RMSFFRAJN1IDWOA4G0PGT0300EFCVW&v=20180731')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.meta.code === 200) {
          const venue = responseJson.response.venue
          let location = {}
          if (venue.id) {
            location.id = venue.id
          }
          if (venue.name) {
            location.name = venue.name
          }
          if (venue.url) {
            location.url = venue.url
          } else {
            location.url = null
          }
          if (venue.price && venue.price.tier) {
            let price = '';
            for (let i = 0; i < venue.price.tier; i++) {
              price += '€'
            }
            location.priceTier = venue.price.tier
            location.price = price
          } else {
            location.priceTier = 'Price unknown'
            location.price = 'Price unknown'
          }
          if (venue.contact && venue.contact.formattedPhone) {
            location.phone = venue.contact.formattedPhone
          } else {
            location.phone = 'No additional details provided'
          }
          if (venue.hours && venue.hours.isOpen) {
            location.isOpen = venue.hours.isOpen
          }
          if (venue.hours && venue.hours.status) {
            location.openStatus = venue.hours.status
          }
          if (venue.location && venue.location.address) {
            location.address = venue.location.address
          }
          if (venue.location && venue.location.lat && venue.location.lng) {
            location.location = {
              lat: venue.location.lat,
              lng: venue.location.lng
            }
          }
          if (venue.rating) {
            location.rating = venue.rating
          }
          if (venue.bestPhoto) {
            location.photo = venue.bestPhoto.prefix + 'width300' + venue.bestPhoto.suffix
          }
          if (venue.shortUrl) {
            location.foursquarePage = venue.shortUrl
          }
          locationsInfo.push(location)
        } else { // catch any status error codes from response
          if (i === 0 ) {
            window.alert('Oh no! There was a status error retrieving additional data about our locations - Status Code ' + responseJson.meta.code + ' - For more information visit https://developer.foursquare.com/docs/api/troubleshooting/errors')
          }
          this.setState({ showOptions: false })
        }
        // inside then, inside loop
      })
      // catch errors with request
      .catch((error) => {
        if (i === 0) {
          window.alert('Oh no! There was a problem loading additional data about our locations - ' + error + ' - Try reloading the page, come visit us later, or take this map out and explore!')
          this.setState({ showFilterOptions: false })
        }
      })
    } // end of loop
    this.updateLocationsInfo(locationsInfo)
  }

  /* Update locations with additional information and set new state,
   * then add onClick to each marker
   */
  updateLocationsInfo = (locationsInfo) => {
      this.setState({ locations: locationsInfo }, () => {this.addMarkerClick()})
  }

  // Add makers to the map using initial locations state built from Foursquare API
  updateMarkers = (locations) => {
    // Temp markers array to hold created markers
    let markers = []
    // Loop through locations to get and set data for each marker
    for (var i = 0; i < locations.length; i++) {
      //get position from location array
      var position = locations[i].location;
      var title = locations[i].name;
      var id = locations[i].id;
      // create marker per location and add to markers array
      var marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: id,
        map: this.state.map
      });
      markers.push(marker);
    }
    /* Set markers state from temp markers array,
     * then go on to fetch additional location information
     */
    this.setState({ markers: markers }, () => this.populateLocationsInfo())
  }

  // Add event listeners to markers that selects the clicked on marker
  addMarkerClick = () => {
    this.setState((prevState) => {
      for (let i = 0; i < prevState.markers.length; i++) {
        prevState.markers[i].addListener('click', () => {
        this.selectLocation(prevState.markers[i])
        })
      }
    })
  }

  // Handle click on marker, either on map or in list
  selectLocation = (marker) => {
    // match marker with full location and set selected location
    const selectedLocation = this.state.locations.find(loc => marker.id === loc.id)
    /* Animate marker on selection - with help from Google API docs
     * and a tip from Mikael on Stack Overflow -
     * https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once/7832086
     */
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null)
    } else {
      marker.setAnimation(4)
    }
    // Set timeout for improved UI experience
    setTimeout(() => {
      // Set location
      this.setState({ selectedMarker: selectedLocation })
      // Open information for lcoation
      this.openInfo()
      // Close list
      this.closeList()
      // Hide filters
      this.hideFilters()
      // Zoom and pan map to selected marker
      this.setState((prevState) => {
        prevState.map.setZoom(17)
        prevState.map.panTo(marker.getPosition())
      })
    }, 700)
  }

  // Recenter the map to initial view
  recenterMap = () => {
    this.setState((prevState) => {
      prevState.map.setZoom(13)
      prevState.map.setCenter({lat: 49.452102, lng: 11.076665})
    })
  }

  // Hide all markers
  hideMarkers = () => {
    const markers = this.state.markers
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
    this.setState({ markers: markers })
  }

  // Show all markers
  showMarkers = () => {
    const markers = this.state.markers
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(this.state.map)
    }
    this.setState({ markers: markers })
    // Clear any filters in place
    if (this.state.openFilter) {
      this.clearOpenFilter()
    }
    if (this.state.priceFilter.applied) {
      this.setState({ priceFilter: {
        applied: false,
        select: "none"
      }
    })
    }
    if (this.state.ratingFilter.applied) {
      this.setState({ ratingFilter: {
          applied: false,
          select: "none"
        }
      })
    }
  }

  /* Open list view that will populate from markers state
   * and close any other open views
   */
  openList = () => {
    this.setState({ showList: true })
    this.closeInfo()
    this.hideFilters()
  }

  // Close list view if open
  closeList = () => {
    if (this.state.showList) {
      this.setState({ showList: false })
    }
  }

  // Open info for selected location
  openInfo = () => {
    this.setState({ showPlace: true })
  }

  // Close info for selected location, zoom out and recenter map
  closeInfo = () => {
    this.recenterMap()
    if (this.state.showPlace) {
      this.setState({ showPlace: false })
    }
  }

  // Open filters and close other open views
  openFilters = () => {
    this.setState({ showFilters: true })
    this.closeList()
    this.closeInfo()
  }

  // Hide filters
  hideFilters = () => {
    if (this.state.showFilters) {
      this.setState({ showFilters: false })
    }
  }

  // Filter markers by whether they're currently open
  filterByOpenNow = () => {
    const currentMarkers = this.state.markers
    const locs = this.state.locations
    for (let i = 0; i < currentMarkers.length; i++) {
      //  Match locations to markers
      const loc = locs.find(l => l.id === currentMarkers[i].id)
      // Check isOpen property existance and availability and hide closed markers
      if (!loc.isOpen || loc.isOpen !== true) {
        currentMarkers[i].setMap(null)
        // Check for existing price filter and maintain values
      } else if (this.state.priceFilter.applied === true && loc.priceTier.toString() !== this.state.priceFilter.select) {
          currentMarkers[i].setMap(null)
          // Check for existing ratings filter and maintain values
      } else if (this.state.ratingFilter.applied === true && loc.rating < this.state.ratingFilter.select) {
          currentMarkers[i].setMap(null)
      }
    }
    // Update markers and open filter value
    this.setState(
      { markers: currentMarkers,
        openFilter: true }
    )
  }

  // Clear open now filter while leaving any others in place
  clearOpenFilter = () => {
    const currentMarkers = this.state.markers
    const locs = this.state.locations
    for (let i = 0; i < currentMarkers.length; i++) {
      // Match locations to markers
      const loc = locs.find(l => l.id === currentMarkers[i].id)
      // Check for price filter and maintain values
      if (this.state.priceFilter.applied === true && loc.priceTier.toString() !== this.state.priceFilter.select) {
          currentMarkers[i].setMap(null)
          // Check for ratings filter and maintain values
      } else if (this.state.ratingFilter.applied === true && loc.rating < this.state.ratingFilter.select) {
          currentMarkers[i].setMap(null)
      } else {
        // Show all markers not matching filters
        currentMarkers[i].setMap(this.state.map)
      }
    }
    // Set markers and reset open filter
    this.setState({
      markers: currentMarkers,
      openFilter: false })
  }

  // Filter markers and list by price tier
  filterByPrice = (price) => {
    const currentMarkers = this.state.markers
    const locs = this.state.locations
    // Check if value is clear, then clear selection and reset filter
    if (price === "clear") {
      this.setState({
        priceFilter: {
          applied: false,
          select: "none"
        }
      })
      for (let i = 0; i < currentMarkers.length; i++) {
        // Match locations with markers
        const loc = locs.find(l => l.id === currentMarkers[i].id)
        // Check for existing open filter and maintain values
        if (this.state.openFilter === true && (!loc.isOpen || loc.isOpen !== true)) {
            currentMarkers[i].setMap(null)
            // Check for existing ratings filter and maintain values
        } else if (this.state.ratingFilter.applied === true && loc.rating < this.state.ratingFilter.select) {
            currentMarkers[i].setMap(null)
        } else {
          // Reshow all other markers
          currentMarkers[i].setMap(this.state.map)
        }
      }
    } else {
      /* If value is other than "clear", Loop through markers and check for match
       * against price tier, as well as other currently selected filters and show matches
       * that satisfy all current filters
       */
      for (let i = 0; i < currentMarkers.length; i++) {
        const loc = locs.find(l => l.id === currentMarkers[i].id)
        if (loc.priceTier.toString() !== price) {
          currentMarkers[i].setMap(null)
          // Check against open filter and maintain values
        } else if (this.state.openFilter === true && (!loc.isOpen || loc.isOpen !== true)) {
            currentMarkers[i].setMap(null)
            // Check against ratings filter and maintain values
        } else if (this.state.ratingFilter.applied === true && loc.rating < this.state.ratingFilter.select) {
            currentMarkers[i].setMap(null)
        } else {
          currentMarkers[i].setMap(this.state.map)
        }
      }
      // Update markers and filter information
      this.setState({
        markers: currentMarkers,
        priceFilter: {
          applied: true,
          select: price
        }
      })
    }
  }

  // Filter markers by rating while leaving other filters in place
  filterByRating = (rating) => {
    const currentMarkers = this.state.markers
    const locs = this.state.locations
    // If value is "clear", clear filter and reset values
    if (rating === "clear") {
      this.setState({
        ratingFilter: {
          applied: false,
          select: "none"
        }
      })
      for (let i = 0; i < currentMarkers.length; i++) {
        // Match locations against markers and leave other filters in place
        const loc = locs.find(l => l.id === currentMarkers[i].id)
        // Check against open filter
        if (this.state.openFilter === true && (!loc.isOpen || loc.isOpen !== true)) {
            currentMarkers[i].setMap(null)
            // Check against price filter
        } else if (this.state.priceFilter.applied === true && loc.priceTier.toString() !== this.state.priceFilter.select) {
            currentMarkers[i].setMap(null)
        } else {
          currentMarkers[i].setMap(this.state.map)
        }
      }
    } else {
      /* If value is other than "clear", Loop through markers and check for match
       * against rating, as well as other currently selected filters and show matches
       * that satisfy all current filters
       */
      for (let i = 0; i < currentMarkers.length; i++) {
        const loc = locs.find(l => l.id === currentMarkers[i].id)
        if (loc.rating < rating) {
          currentMarkers[i].setMap(null)
          // Check again open filter and maintain values
        } else if (this.state.openFilter === true && (!loc.isOpen || loc.isOpen !== true)) {
            currentMarkers[i].setMap(null)
            // Check against price filter and maintain values
        } else if (this.state.priceFilter.applied === true && loc.priceTier.toString() !== this.state.priceFilter.select) {
            currentMarkers[i].setMap(null)
        } else {
          currentMarkers[i].setMap(this.state.map)
        }
      }
      // Set values and filter
      this.setState({
        markers: currentMarkers,
        ratingFilter: {
          applied: true,
          select: rating
        }
      })
    }
  }

  /* Reset map and markers to original states, closing all other views
   * and clearing all filters
   */
  resetMap = () => {
    if (this.state.showList) {
    this.closeList()
    }
    if (this.state.showFilters) {
      this.hideFilters()
    }
    if (this.state.openFilter) {
      this.clearOpenFilter()
    }
    if (this.state.priceFilter.applied) {
      this.setState({ priceFilter: {
        applied: false,
        select: "none"
      }})
    }
    if (this.state.ratingFilter.applied) {
      this.setState({ ratingFilter: {
          applied: false,
          select: "none"
        }
      })
    }
    if (this.state.showPlace) {
      this.closeInfo()
    }
    this.showMarkers()
    this.recenterMap()
  }

  render() {
    return (
      <div id="App" role="main">
        <Header />
        <Map
          markers={this.state.markers}
          setMap={this.setMap}
          fetchLocations={this.fetchFoursquareVenues}
          showOptions={this.state.showOptions}
        />
        {this.state.showList &&
          <ListView
            markers={this.state.markers}
            handleListClose={this.closeList}
            handleItemClick={this.selectLocation}
          />
        }
        {this.state.showFilters &&
          <Filter
            handleFiltersClose={this.hideFilters}
            hideMarkers={this.hideMarkers}
            showMarkers={this.showMarkers}
            filterByOpenNow={this.filterByOpenNow}
            filterByPrice={this.filterByPrice}
            filterByRating={this.filterByRating}
            openFilterSelected={this.state.openFilter}
            priceFilter={this.state.priceFilter}
            ratingFilter={this.state.ratingFilter}
            clearOpenFilter={this.clearOpenFilter}
          />
        }
        {this.state.showPlace &&
          <BurgerPlaceInfo
            burgerPlace={this.state.selectedMarker}
            handleInfoClose={this.closeInfo}
            showPlace={this.state.showPlace}
          />
        }
        {this.state.showOptions &&
          <Options
            handleListOpen={this.openList}
            handleFiltersOpen={this.openFilters}
            handleReset={this.resetMap}
            showFilterOptions={this.state.showFilterOptions}
          />
        }
      </div>
    );
  }
}

export default App;
