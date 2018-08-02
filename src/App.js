import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Map from './Map.js'

class App extends Component {
  state = {
      locations: [],
      markers: [],
      map: null
    }

    setMap = (map) => {
      this.setState({ map })
    }

    fetchFoursquareVenues = () => {
      console.log('putting request to foursquare')
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
          console.log('creating locations')
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
        console.log('locations created', locations)
        // set location state with new locations from foursquare
        this.setState({ locations: locations }, () => {this.updateMarkers(this.state.locations)})
        console.log(this.state.locations)
      })
      .catch((error) => {
        console.error(error);
      })
    }

  updateMarkers(locations) {
    console.log('hello, trying to update markers now with ', this.state.locations, locations)
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
      console.log('trying to make marker for location ', i, locations[i])
      var position = locations[i].location;
      var title = locations[i].name;
      // create marker per location and add to markers array
      var marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i,
        map: this.state.map
      });
      console.log(marker)
      // push marker to array
      markers.push(marker);
      console.log('markers in loop', markers)
      // create onclick event to open infowindow at marker
      //marker.addListener('click', function() {
      //  populateInfoWindow(this, largeInfoWindow);
      //});
    }
    console.log('markers out loop', markers)
    // set markers state
    this.setState({ markers: markers }, () => console.log('state markers', this.state.markers))
    //let bounds = new window.google.maps.LatLngBounds();
    //console.log('bounds ', bounds)
    // extend map boundaries for each marker and display marker
    for (let i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(this.state.map);
      //bounds.extend(this.state.markers[i].position);
    }
    //this.state.map.fitBounds(bounds);
  }

  /*componentDidMount() {
    this.fetchFoursquareVenues()
  }*/

  /*showMarkers() {
    let bounds = new window.google.maps.LatLngBounds();
    // extend map boundaries for each marker and display marker
    for (let i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(map);
      bounds.extend(this.state.markers[i].position);
    }
    map.fitBounds(bounds);
  }*/

  render() {
    return (
      <div id="App">
        <Header />
        <Map
          markers={this.state.markers}
          setMap={this.setMap}
          fetchLocations={this.fetchFoursquareVenues}
        />
      </div>
    );
  }
}

export default App;
