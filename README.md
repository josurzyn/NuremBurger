### NuremBurger - Udacity Neighbourhood Maps Project

NuremBurger is my implementation of the Udacity React Neighbourhood Maps project for the Front-End-Nanodegree. It makes use of the Foursquare API and Google Maps API to show the current top ten recommended burger joints in Nuremberg, Germany. The locations are displayed both as markers on the map, and are available in a list by clicking the 'List' button. Selecting a location, either by clicking a marker or a list item, will display more information about that location as available from the Foursquare API. Locations can be filtered using a number of criteria, such as whether they are currently open, their price range, and their rating on Foursquare. You can also combine multiple filters to narrow down your options. Guten Appetit!

## Installing the Project
* Clone or download this respository
* `cd` into the respository
* Install dependencies using `npm install`

## Running the Project
To run the production build of the project, which includes an active service worker:
* After installing the project as above, run `npm run build`
* Serve it with a static server by installing `npm install -g serve` then serving it via `serve -s build`
* Visit http://localhost:5000

Alternatively, you can run the development version using `npm start`. The app should now be available on http://localhost:3000

**Please Note** Running the project in development mode will **not** include a service worker. To use an active service worker, use `npm run build` and a static server instead.

## Google Maps API
The project uses the Google Maps Javascript API for the map and markers.

## Powered By Foursquare
The location data, including detailed venue information and photos is being powered by the Foursquare API.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of a guide for this [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
