import React, {Component} from 'react'

class Map extends Component {

  // Load Google Maps API and add to DOM
  loadScript = (src) => {
    if (!window.google) {
      console.log('loading script!')
      var script = document.createElement('script')
      script.src = src
      var node = window.document.getElementsByTagName("script")[0]
      node.parentNode.insertBefore(script, node)
      // listen for successful map load - might need to do something else here
      script.addEventListener('load', function() {
        console.log('map loaded')
      })
      // alert user if there's an error loading the map
      script.addEventListener('error', function(e) {
        window.alert('There was a problem loading the map:' + e)
      })
    }
  }

  // Connect map to global window so it can be accessed by window.google.maps
  componentDidMount() {
    window.initMap = this.initMap
    // Call async loading of Google Maps API, passing in key and libraries
    this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCxe0yQBOOR2yc0ktudoL5BDpsRKrOq4X8&v=3&callback=initMap')
  }

  // Initialise the map
  initMap = () => {
    console.log('initialise map!')
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 49.452102, lng: 11.076665},
      //styles: styles,
      zoom: 13.5,
      mapTypeControl: false
    });
    // make map available throughout app
    this.props.setMap(map)
    console.log('calling setMap')
    // fetch burger places from foursquare
    this.props.fetchLocations()
    console.log('fetching locations')
  }

  render() {
    return(
      <div id="map">Map Space</div>
    )
  }
}

export default Map
