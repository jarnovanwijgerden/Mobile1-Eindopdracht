
var lat;
var lng;
var url;


function getQueryURL()
{
		url = "https://api.eet.nu/venues?";
		var _checkbox = $("#chkrating");
		var _afstand = $("#distance");
		var _categorie = $("#category");

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
			url += "max_distance="+ _afstand.val();
			return getGeolocation();
		}
		else
		{
			return url;
		}
}

function getGeolocation()
{
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
}
function onSuccess(position) 
{ 
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    url += "&geolocation=" + lat + "," + lng;
  	return url;
}
function onError(error)
{
	alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}