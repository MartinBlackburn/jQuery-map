GoogleMap = function(mapContainer) 
{   
    //varibles
    var address;
    var zoomLevel = 10;
    var geocoder = new google.maps.Geocoder();
    var mapOptions;
    
    //setDefault map options
    updateMapOptions();
    
    //get the address and display it    
    GoogleMap.prototype.render = function()
    {
        //if no address, warn user
        if(!address) 
        {  
            err("The address element needs setting.");
            return false;
        }
        
        var map = new google.maps.Map(mapContainer[0], mapOptions);
        
        geocoder.geocode({'address': address}, function(results, status)
        {
            if (status == google.maps.GeocoderStatus.OK)
            {
                map.setCenter(results[0].geometry.location);
                
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                err("Geocode was not successful for the following reason: " + status);
                return false;
            }
        });
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
    
    //output an error to the console when needed
    function err(message)  
    {  
        var err = new Error();  
        err.name = "GoogleMaps"; 
        err.message = message;  
        throw(err);  
    }  
};

$(function() 
{
    $(".googleMap").each(function()
    {
        var googleMap = new GoogleMap($(this));
        googleMap.setAddressElement($(".address"));
        googleMap.render();
    });
});