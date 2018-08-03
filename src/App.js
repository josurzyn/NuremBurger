import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Map from './Map.js'
import BurgerPlaceInfo from './BurgerPlaceInfo.js'
import ListView from './ListView.js'

class App extends Component {
  state = {
      locations: [],
      markers: [],
      map: null,
      selectedMarker: [],
      showList: false,
      showPlace: false,
      showFilters: false
    }

    setMap = (map) => {
      console.log('I, setMap')
      this.setState({ map })
    }

    fetchFoursquareVenues = () => {
      console.log('I, fetchFoursquareVenues')
      // Fetch recommended venues for 'burgers' from Foursquare
      fetch('https://api.foursquare.com/v2/venues/explore?ll=49.452102,11.076665&query=burgers&limit=10&client_id=FO1J3EFVMOXJGRR2AFBHABINFZXXD2MOZXUZ4VA5RUKI0IFC&client_secret=VWWOO2BDCQ0FBY5JA1RMSFFRAJN1IDWOA4G0PGT0300EFCVW&v=20180731')
      .then((response) => response.json())
      .then((responseJson) => {
        // Get list of venues from response
        var venues = responseJson.response.groups[0].items
        console.log(venues)
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

          locations.push(location);
        }
        // set location state with new locations from foursquare
        this.setState({ locations: locations }, () => {this.updateMarkers(this.state.locations)})
      })
      .catch((error) => {
        console.error(error);
      })
    }

    //populate location info TODO: Not currently working - just changing locations to hans im gluck url
    /*populateLocationsInfo = () => {
      console.log('I, populateLocationsInfo', this.state.locations)
      const locationsInfo = []
      for (let i = 0; i < this.state.locations.length; i++) {
        fetch('https://api.foursquare.com/v2/venues/' + this.state.locations[i].id + '?&client_id=FO1J3EFVMOXJGRR2AFBHABINFZXXD2MOZXUZ4VA5RUKI0IFC&client_secret=VWWOO2BDCQ0FBY5JA1RMSFFRAJN1IDWOA4G0PGT0300EFCVW&v=20180731')
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.meta.code === 200) {
            const venue = responseJson.response.venue
            console.log('this venue is ', venue, this.state.locations[i])
            let location = {}
            console.log('the initial location is ', location)
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
              location.price = price
            }
            if (venue.contact && venue.contact.formattedPhone) {
              location.phone = venue.contact.formattedPhone
            } else {
              location.phone = 'No phone number provided'
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
            if (venue.rating) {
              location.rating = venue.rating
            }
            if (venue.bestPhoto) {
              location.photo = venue.bestPhoto.prefix + 'height100' + venue.bestPhoto.suffix
            } else {
            console.log('sorry, foursquare did not like that', responseJson.meta.code)
            }

            locationsInfo.push(location)
            return locationsInfo
          }
          // inside then, inside loop
        })
      }
      this.setState({ locations: locationsInfo }, () => {this.updateMarkers(this.state.locations)})
    }*/

  updateMarkers = (locations) => {
    console.log('I, updateMarkers', this.state.locations)
    // markers variable to create markers.
    let markers = []
    /* using hard coded locations to test markers set up
      var locations = [
      {title: 'Burg', location: {lat: 49.457883, lng: 11.075846}},
      {title: 'Hauptmarkt', location: {lat: 49.454162, lng: 11.07724}},
      {title: 'Lorenzer Platz', location: {lat: 49.451039, lng: 11.079391}},
      {title: 'Sebaldler Platz', location: {lat: 49.455504, lng: 11.076302}},
      {title: 'Kultur Garten', location: {lat: 49.449223, lng: 11.08234}},
      {title: 'St Katharine', location: {lat: 49.451128, lng: 11.082441}}
    ];*/
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
      // create onclick event to open infowindow at marker
    //  marker.addListener('click', () =>
    //    this.populateInfo(this.state.markers[i])
    //  );
      // push marker to array
      // Add bounce to marker on click - with help from Google API docs
      // and a tip from Mikael on Stack Overflow -
      // https://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once/7832086
      markers.push(marker);
      marker.addListener('click', () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null)
        } else {
          marker.setAnimation(4)
        }
      })
    }
    // set markers state
    this.setState({ markers: markers }/*, () => this.addMarkerClick()*/)
    //let bounds = new window.google.maps.LatLngBounds();
    //console.log('bounds ', bounds)
    // extend map boundaries for each marker and display marker
  //  for (let i = 0; i < this.state.markers.length; i++) {
    //  this.state.markers[i].setMap(this.state.map);
      //bounds.extend(this.state.markers[i].position);
    //}
    //this.state.map.fitBounds(bounds);
  }

  /*markerBounce = () => {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null)
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
    }
  }*/

  // Add event listeners to markers
  addMarkerClick = () => {
    console.log('I, addMarkerClick')
    this.setState((prevState) => {
      for (let i = 0; i < prevState.markers.length; i++) {
        prevState.markers[i].addListener('click', () => {
          this.selectLocation(prevState.markers[i])
        })
      }
    })
  }

  selectLocation = (location) => {
    this.setState({ selectedMarker: location })
    this.openInfo()
    this.closeList()
    this.hideFilters()
  }



  // Open info for burger place on click
  /*populateInfo = (marker) => {
    console.log('I, populateInfo')
    let info = {}
    //console.log(marker)
    fetch('https://api.foursquare.com/v2/venues/' + marker.id + '?&client_id=FO1J3EFVMOXJGRR2AFBHABINFZXXD2MOZXUZ4VA5RUKI0IFC&client_secret=VWWOO2BDCQ0FBY5JA1RMSFFRAJN1IDWOA4G0PGT0300EFCVW&v=20180731')
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson)
      if (responseJson.meta.code === 200) {
        const venue = responseJson.response.venue
        if (venue.name) {
          info.name = venue.name
        }
        if (venue.url) {
          info.url = venue.url
        }
        if (venue.price && venue.price.tier) {
          let price = '';
          for (let i = 0; i < venue.price.tier; i++) {
            price += '€'
          }
          info.price = price
        }
        if (venue.contact && venue.contact.formattedPhone) {
          info.phone = venue.contact.formattedPhone
        } else {
          info.phone = 'No phone number provided'
        }
        if (venue.hours && venue.hours.isOpen) {
          info.isOpen = venue.hours.isOpen
        }
        if (venue.hours && venue.hours.status) {
          info.openStatus = venue.hours.status
        }
        if (venue.location && venue.location.address) {
          info.address = venue.location.address
        }
        if (venue.rating) {
          info.rating = venue.rating
        }
        if (venue.bestPhoto) {
          info.photo = venue.bestPhoto.prefix + 'height100' + venue.bestPhoto.suffix
        }
      } else {
        console.log('sorry, foursquare did not like that', responseJson.meta.code)
      }
      this.setState({ selectedMarker: info })
      this.openInfo()
      this.closeList()
      this.hideFilters()
    })
    .catch((error) => {
      console.log(error)
    })
  }*/

  // Hide all markers
  hideMarkers = () => {
    for (let i = 0; i < this.state.markers.length; i++) {
      this.setState((prevState) => {
        this.state.markers[i].setMap(null)
      })
    }
    console.log(this.state.markers)
  }

  // Show all markers
  showMarkers = () => {
    for (let i = 0; i < this.state.markers.length; i++) {
      this.setState((prevState) => {
        this.state.markers[i].setMap(this.state.map)
      })
    }
  }

  openList = () => {
    console.log('I, openList')
    console.log(`I'ma open the list now`)
    this.setState({ showList: true })
    this.closeInfo()
    this.hideFilters()
    console.log('locations after open list ', this.state.locations)
  }

  closeList = () => {
    console.log('I, closeList')
    this.setState({ showList: false })
  }

  openInfo = () => {
    console.log('I, openList')
    this.setState({ showPlace: true })
  }

  closeInfo = () => {
    console.log('I, closeInfo')
    this.setState({ showPlace: false })
  }

  openFilters = () => {
    console.log('I, openFilters')
    this.setState({ showFilters: true })
    this.closeList()
    this.closeInfo()
  }

  hideFilters = () => {
    console.log('I, hideFilters')
    this.setState({ showFilters: false })
  }

  testFoo = (marker) => {
    console.log('bar', marker)
  }

  render() {
    return (
      <div id="App">
        <Header />
        <Map
          markers={this.state.markers}
          setMap={this.setMap}
          fetchLocations={this.fetchFoursquareVenues}
        />
        <ListView
          markers={this.state.markers}
          handleListOpen={this.openList}
          handleListClose={this.closeList}
          handleItemClick={this.populateInfo}
          listVisible={this.state.showList}
          handleFiltersOpen={this.openFilters}
          showFilters={this.state.showFilters}
          hideFilters={this.hideFilters}
          hideMarkers={this.hideMarkers}
          showMarkers={this.showMarkers}
        />
        <BurgerPlaceInfo
          burgerPlace={this.state.selectedMarker}
          handleInfoClose={this.closeInfo}
          showPlace={this.state.showPlace}
        />
      </div>
    );
  }
}

export default App;
