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
      showList: false
    }

    setMap = (map) => {
      this.setState({ map })
    }

    fetchFoursquareVenues = () => {
      // Fetch recommended venues for 'burgers' from Foursquare
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

          locations.push(location);
        }
        // set location state with new locations from foursquare
        this.setState({ locations: locations }, () => {this.updateMarkers(this.state.locations)})
      })
      .catch((error) => {
        console.error(error);
      })
    }

  updateMarkers(locations) {
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
      markers.push(marker);
    }
    // set markers state
    this.setState({ markers: markers }, () => this.addMarkerClick())
    //let bounds = new window.google.maps.LatLngBounds();
    //console.log('bounds ', bounds)
    // extend map boundaries for each marker and display marker
  //  for (let i = 0; i < this.state.markers.length; i++) {
    //  this.state.markers[i].setMap(this.state.map);
      //bounds.extend(this.state.markers[i].position);
    //}
    //this.state.map.fitBounds(bounds);
  }

  // Add event listeners to markers
  addMarkerClick = () => {
    this.setState((prevState) => {
      for (let i = 0; i < prevState.markers.length; i++) {
        prevState.markers[i].addListener('click', () => {
          this.populateInfo(prevState.markers[i])
        })
      }
    })
  }

  // Open info for burger place on click
  populateInfo = (marker) => {
    let info = {}
    console.log(marker)
    fetch('https://api.foursquare.com/v2/venues/' + marker.id + '?&client_id=FO1J3EFVMOXJGRR2AFBHABINFZXXD2MOZXUZ4VA5RUKI0IFC&client_secret=VWWOO2BDCQ0FBY5JA1RMSFFRAJN1IDWOA4G0PGT0300EFCVW&v=20180731')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
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
      }
      this.setState({ selectedMarker: info })
    })
  }

  openList = () => {
    console.log(`I'ma open the list now`)
    this.setState({ showList: true })
  }

  closeList = () => {
    this.setState({ showList: false })
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
        />
        <BurgerPlaceInfo
          burgerPlace={this.state.selectedMarker}
        />
      </div>
    );
  }
}

export default App;
