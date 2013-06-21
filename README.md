#Responsive Google map

A responsive map using jQuery and the Google maps API

##How it works
Include the googleMap.js, then set it up using the following.

```javascript
//setup new googleMap
var googleMap = new GoogleMap();

//set the zoom level
googleMap.setZoomLevel(12);

//pass the element that contains the address
googleMap.setAddressElement($(".address"));

//pass the element to draw the map in
googleMap.setMapElement($(".googleMap"));

//render the map
googleMap.render();
```

[View it in action here](http://martinblackburn.github.com/jQuery-map/)

###Notes
This will working using jQuery 1.10.1