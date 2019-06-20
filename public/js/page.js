var map,directionsDisplay,map_source_lat,map_source_lat,map_source_long,map_dest_lat,map_dest_long,date_for_map;
$(document).ready(function() {
	loadDropDown();
	oninitialize();

	var sourceAddress ,sourceCity,sourceCounty,sourceState,sourceZip;
	
	var timer	= 0;
	
    var trainOrigin,trainDestination;
	
	
	$( "#go" ).click(function() {

    	var sourceStnName = $('#source').find(':selected').text();
    	var destinationStnName = $('#destination').find(':selected').text();
   		
		var source = $('#source').find(":selected").val(); 
		var destination = $('#destination').find(":selected").val(); 

		
		if(source == destination){
		  	alert("You need to select different stations");
		  }
		  else 
		  {

		  	$("#table").empty();
		  	$("#table").append($('<tr><th>Source</th><th>Departure</th><th>Destination</th><th>Arrival</th><th>Fare</th></tr>'));
		  	

		  	trainSource =  $('#source option:selected').text();
		  	trainDestination =  $('#destination option:selected').text();
		  	
		  		$.getJSON("/station?source=" + source , function(data, status){ 
                     var temp=data.root.stations.station;
                  
                    sourceCity	= temp.city;
					sourceCounty = temp.county;
					sourceState = temp.state;
					sourceZip= temp.zipcode;
		  			
		  			sourceAddress = temp.address;


		  			 map_source_lat = temp.gtfs_latitude;
 map_source_long = temp.gtfs_longitude;
 
		  			
		  			$("#side").empty();
		  			$("#side").append($('<h2>'+ trainSource+'</h2>' + '<p>Local Address: ' + sourceAddress + '</p>'  + '<p>City: ' + sourceCity + '</p>'+ '<p>County: ' + sourceCounty + '</p>' + '<p>State: ' + sourceState + '</p>' + '<p>City: ' + sourceCity + '</p>'  +'<p>ZipCode: ' + sourceZip + '</p>'));
		  			
		  			$.getJSON("/station?source=" + destination , function(data, status){ 
                        var temp2=data.root.stations.station;
		  			   

		  			     map_dest_lat = temp2.gtfs_latitude;
                          map_dest_long = temp2.gtfs_longitude;

                          alert(map_dest_lat);

                      

                       maproutes();
        
		  		});
		  		});

		  		
		  		

		  		$.getJSON("/trips?source=" + source + "&dest=" + destination, function(data, status){ 
		  	
			  	   $.each(data.root.schedule.request.trip, function(key,value){
			  	    console.log("key"+key);
			  	    
			  	   	console.log("value"+value["@fare"]);
			  		 var fare	= value["@fare"];
			  						
					
	  				var arrival = value["@destTimeMin"];
                    
	  				
	  				var departure = value["@origTimeMin"];

	  				console.log("departure"+departure);
	  				var date = value["@origTimeDate"];//same
           if(key==2){
           	
           	var departure1=value["@origTimeMin"];
 //alert("departure1"+departure1);
             			 var date1 = new Date.parse(departure1);
             			
             			 console.log(date1);
            jQuery("#getting-started").html("");
             jQuery("#getting-started").countdown(date1, function(event) {

                jQuery(this).text(
                event.strftime('%H:%M:%S remaining for the first train to depart')
                );
            });
         }


					
	  				

	  				$("#table").append($('<tr>' +'<td>'+ trainSource+ '</td>'+ '<td>' + departure + '</td>' +'<td>' + trainDestination + '</td>'+ '<td>' + arrival + '</td>' + '<td>$' + fare +'</td>' + '</tr>'));
        			
        			

        			});

			  	$('#depart-text').css("display", "block");
			  	
			  	
			  	});

			  	

		  		$('#displayTable').addClass('border');


			  	clearInterval(timer);
		  		timer = setInterval(function(){

		  		
		  		$("#table").empty();
		  		$("#table").append($('<tr><th>Source</th><th>Departure</th><th>Destination</th><th>Arrival</th><th>Fare</th></tr>'));


		  		$.getJSON("/trips?source=" + source + "&dest=" + destination, function(data, status){ 
		  			
					
			  	$.each(data.root.schedule.request.trip, function(key,value){

			  		 var fare	= value["@fare"];//same
			  						
					
	  				var arrival = value["@destTimeMin"];

	  				
	  				var departure = value["@origTimeMin"];

	  				console.log("departure"+departure);
	  				var date = value["@origTimeDate"];

                     if(key==2){
                  	var departure1=value["@origTimeMin"];
             			 var date1 = new Date.parse(departure1);
            jQuery("#getting-started").html("");
             jQuery("#getting-started").countdown(date1, function(event) {

                jQuery(this).text(
                event.strftime('%H:%M:%S remaining for the first train to depart')

                );

            });
         }

	  				$("#table").append($('<tr>'+'</td>' +'<td>'+ trainSource+ '</td>'+ '<td>' + departure + '</td>' +'<td>' + trainDestination + '</td>'+ '<td>' + arrival + '</td>' + '<td>$' + fare +'</td>' + '</tr>'));
        			
        		
	  				

        			});
				  		
			  	});

		  			},30000)
			
		  	 
		  }


		});


});
function displayMap(sourceLattitude,sourceLongitude,destLatttitude,destLongitude){
					
		  			var directionsService = new google.maps.DirectionsService;
				    var directionsDisplay = new google.maps.DirectionsRenderer;
				    var mapView = document.getElementById("map");
				    
				    var mapViewBorder = { zoom: 15,scrollwheel: false};
				    var mapdisplay = new google.maps.Map(mapView, mapViewBorder);
				    directionsDisplay.setMap(mapdisplay);
				       directionsService.route({
				            origin: new google.maps.LatLng(sourceLattitude,sourceLongitude),
				            destination: new google.maps.LatLng(destLatttitude,destLongitude),
				            travelMode: 'TRANSIT'
				            }, function(response, status) {
				            if (status === 'OK') {
				              directionsDisplay.setDirections(response);
				            } else {
				              window.alert('Directions request failed due to ' + status);
				            }
				          });

		  		}

		  		function loadDropDown(){
	         $.getJSON("/stations", function(data, status){
             $.each(data.root.stations.station, function(key,value){
        	$(".stations").append($('<option></option>').val(value.abbr).html(value.name));
        });
    	});
	}

	function oninitialize() {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var mapdefualt = new google.maps.Map(document.getElementById("map"), {
                zoom: 7,
                center: {lat: 37.000, lng: -122.000}
            });
            directionsDisplay.setMap(mapdefualt);
           mapcallback();
        }
       

function mapcallback() {
    var latlng = new google.maps.LatLng(37.7831, -122.4039);
    directionsDisplay = new google.maps.DirectionsRenderer();
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    directionsDisplay.setMap(map);
}


function maproutes() {
    
    var selectedMode = "TRANSIT";
    if (map_source_lat && map_source_long && map_dest_lat && map_dest_long) {
        new google.maps.event.trigger(map, 'resize');

        let sourcelatLng = new google.maps.LatLng(map_source_lat, map_source_long);
        let destlatLng = new google.maps.LatLng(map_dest_lat, map_dest_long);
        if (!date_for_map) {
            date_for_map = Date.now();
        }
        let date = Date.now();
        var request = {
            origin: sourcelatLng,
            destination: destlatLng,
            travelMode: google.maps.TravelMode[selectedMode],
            transitOptions: {
                departureTime: date.getTime,
                modes: ['TRAIN'],
            }
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            }
        });
        return;
    }
}

