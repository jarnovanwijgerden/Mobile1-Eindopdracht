
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

function getRequest(newUrl) {
	var returndata = "ka";
    $.ajax({
        url: newUrl,
        async: false,
        dataType: 'html',
        type: "GET",
        cache: false,
        success: function (data) {
            returndata = data;
        }
    });
    return returndata;
} 
