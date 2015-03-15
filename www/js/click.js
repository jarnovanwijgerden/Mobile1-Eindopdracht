
var lat;
var lng;
var url;
var _checkbox = $("#chkrating");
var _afstand = $("#distance");
var _categorie = $("#category");



function getQueryURL(callback)
{
	url = "https://api.eet.nu/venues?";
	if(_categorie.val() != "none")
	{
		url += "tags="+ _categorie.val() + "&";
	}
	if(_checkbox.is(':checked'))
	{
		url += "sort_by=rating&";
	}
	if(_afstand.val() != "none")
	{
		getGeolocation(function(position)
		{
			if(position != null)
			{
				url += "max_distance="+ _afstand.val();
				url += "&geolocation=" + position.coords.latitude + "," + position.coords.longitude;
				callback(url);
			}
		});
	}
	else
	{
		callback(url);
	}
}


function getGeolocation(callback)
{

    navigator.geolocation.getCurrentPosition(
    	function(position)
    	{
   			callback(position);
    	}, 
    	function(error)
    	{
    	   	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    	   	callback(null);
    	}, 	{ enableHighAccuracy: true });
}