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
    var ref = window.open(url, '_blank', 'location=yes');
        ref.addEventListener('loaderror', function(event) 
        { 
            ref.close();
        });
}

