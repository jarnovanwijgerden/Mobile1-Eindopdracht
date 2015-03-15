
function getAllRestaurants()
{
	var restaurant =  getRequest("https://api.eet.nu/venues/");
	return restaurant;
}

function getRestaurantByID(id)
{
	var restaurant =  getRequest("https://api.eet.nu/venues/"+id);
	return restaurant;
}
function getRestaurantsByQuery(query, callback)
{
    getRequest(query, function(data)
    {
        callback(data);
    });
}

function getRequest(newUrl, callback) {
	var returndata = "ka";
    $.ajax({
        url: newUrl,
        async: false,
        dataType: 'html',
        type: "GET",
        cache: false,
        success: function (data) {
            callback(data);
        }
    });
} 
