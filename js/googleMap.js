GoogleMap = function() 
{   
    //variables
    var address;
    var zoomLevel = 10;
    var geocoder = new google.maps.Geocoder();
    var mapContainer;
    var map;
    var mapOptions;
    var mapCenter;
    
    //set default map options
    updateMapOptions();
    
    //get the map and display it    
    GoogleMap.prototype.render = function()
    {
        //if no map container, output an error
        if(!mapContainer) 
        {  
            err("The map container needs setting.");
            return false;
        }
        
        //if no address, output an error
        if(!address) 
        {  
            err("The address element needs setting.");
            return false;
        }
        
        map = new google.maps.Map(mapContainer, mapOptions);
        
        geocoder.geocode({'address': address}, function(results, status)
        {
            if (status == google.maps.GeocoderStatus.OK)
            {
                setCenter(results[0].geometry.location);
                addMarker(results[0].geometry.location);
            } else {
                err("Geocode was not successful for the following reason: " + status);
                return false;
            }
        });
    }
    
    //add a marker to the map
    function addMarker(latLng)
    {
        var marker = new google.maps.Marker({
            map: map,
            position: latLng
        }); 
    }
    
    
    //set center of the map
    function setCenter(latLng)
    {
        mapCenter = latLng;
        map.setCenter(latLng);
    }
    
    
    //set the element which contains the address
    GoogleMap.prototype.setMapElement = function(element)
    {
        mapContainer = element.get(0);
    }
    
    
    //set the element which contains the address
    GoogleMap.prototype.setAddressElement = function(element)
    {
        address = element.first().text();
    }
    
    
    //set the initial zoom level of the map
    GoogleMap.prototype.setZoomLevel = function(value)
    {
        zoomLevel = value;
        updateMapOptions();
    }
    
    
    //update map options
    function updateMapOptions()  
    {  
        mapOptions = {
            Zoom: zoomLevel,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        } 
    } 
    
    //output an error to the console
    function err(message)  
    {  
        var err = new Error();  
        err.name = "GoogleMaps"; 
        err.message = message;  
        throw(err);  
    }  
};