
var lat;
var lng;
var url;
$(document).ready(function()
{
	$("#btngo").on("click", function()
	{
		alert("klikie");
		url = "https://api.eet.nu/venues?";
		//tags=snackbar&sort_by=rating&max_distance=50&geolocation=51.882004,5.291087
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
			getGeolocation();
		}	
	});
});

function getGeolocation()
{
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
}
function onSuccess(position) 
{ 
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    url += "&geolocation=" + lat + "," + lng;
    alert("URL = " + url);
}
function onError(error)
{
	alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}