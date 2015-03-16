

var lat;
var lng;
var url;
var _checkbox = "#chkrating";
var _afstand = "#distance";
var _categorie = "#category";



function getQueryURL(callback)
{
    url = "https://api.eet.nu/venues?";
    if($(_categorie).val() != "none")
    {
        url += "tags="+ _categorie.val() + "&";
    }
    if($(_checkbox).is(':checked'))
    {
        url += "sort_by=rating&";
    }
    if($(_afstand).val() != "none")
    {
        getGeolocation(function(position)
        {
            if(position != null)
            {
                url += "max_distance="+ $(_afstand).val();
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
        },
        error: function(error)
        {
            alert("Helaas er ging iets mis" + JSON.stringify(error));
        }
    });
} 
