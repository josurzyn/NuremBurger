import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import Map from './Map.js'

class App extends Component {
  state = {
      markers: []
    }

  updateMarkers = (map) => {
    // markers variable to create markers.
    let markers = []
    // using hard coded locations to test markers set up
    var locations = [
      {title: 'Burg', location: {lat: 49.457883, lng: 11.075846}},
      {title: 'Hauptmarkt', location: {lat: 49.454162, lng: 11.07724}},
      {title: 'Lorenzer Platz', location: {lat: 49.451039, lng: 11.079391}},
      {title: 'Sebaldler Platz', location: {lat: 49.455504, lng: 11.076302}},
      {title: 'Kultur Garten', location: {lat: 49.449223, lng: 11.08234}},
      {title: 'St Katharine', location: {lat: 49.451128, lng: 11.082441}}
    ];
    for (var i = 0; i < locations.length; i++) {
      //get position from location array
      var position = locations[i].location;
      var title = locations[i].title;
      // create marker per location and add to markers array
      var marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i
      });
      // push marker to array
      markers.push(marker);
      // create onclick event to open infowindow at marker
      //marker.addListener('click', function() {
      //  populateInfoWindow(this, largeInfoWindow);
      //});
    }
    // set locations state
    this.setState({ markers: markers })
    console.log(this.state.markers)
    let bounds = new window.google.maps.LatLngBounds();
    // extend map boundaries for each marker and display marker
    for (let i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(map);
      bounds.extend(this.state.markers[i].position);
    }
    map.fitBounds(bounds);
  }

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
          onMarkersUpdate={this.updateMarkers}
        />
      </div>
    );
  }
}

export default App;
