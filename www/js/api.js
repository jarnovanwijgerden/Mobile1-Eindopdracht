
function getAllRestaurants()
{
	var restaurant =  getRequest("https://api.eet.nu/venues/");
	return restaurant;
}

function getRestaurantByID(id, callback)
{
	getRequest("https://api.eet.nu/venues/"+id, function(data)
        {
            callback(data);
        });
}
function getReviewsByID(id, callback)
{
    getRequest("https://api.eet.nu/venues/"+id+"/reviews", function(data)
        {
            callback(data);
        });
}
function getRestaurantsByQuery(query, callback)
{
    getRequest(query, function(data)
    {
        callback(data);
    });
}

function getRequest(newUrl, callback) {
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
