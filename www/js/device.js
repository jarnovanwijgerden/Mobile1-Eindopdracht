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

function appBrowser(url)
{
    alert(url);
	var ref = window.open(url, '_blank', 'hidden=yes');
     ref.addEventListener('loadstop', function(event) {
         alert('Website laden duurt te lang'); 
     });
     // close InAppBrowser after 5 seconds
     setTimeout(function() {
         ref.close();
     }, 15000);
}

