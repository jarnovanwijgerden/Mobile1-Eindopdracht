


// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
    initializeDatabase();
}

var db;




function btnSaveClicked(){
    var categorie = $('#category').val();
    var afstand = $('#distance').val();
    var waardering = $('#waardering').is(':checked');
    SaveSettings(categorie, afstand, waardering);
}

function initializeDatabase() {
    db = window.openDatabase("Database", "1.0", "eet.nu", 2 * 1024 * 1024);
    db.transaction(function(trans)
    { 
        trans.executeSql('CREATE TABLE IF NOT EXISTS settings (categorie TEXT, afstand TEXT, waardering BOOLEAN)');
    }, errorCB);
}

function errorCB(err) {
    alert("Error processing SQL: " + err.message);
    return true;
}

function getSettings(succes, error) {

    var categorie = "";
    var afstand = "";
    var waardering = "";
    db.transaction(function(trans)
    { 
        trans.executeSql('SELECT * FROM settings', [], function(trans, results)
        {
            var len = results.rows.length;
            if(len>0)
            {
                categorie = results.rows.item(0).categorie;
                afstand = results.rows.item(0).afstand;
                waardering = results.rows.item(0).waardering;
                succes(categorie, afstand, waardering);
            }
        }, 
        function(err)
        {
            error(err);
        });
    }, 
    function(err)
    {
         error(err);
    });
}


 
function SaveSettings(categorie, afstand, waardering)
{
    clearTable();
    db.transaction(function(trans){ 
        trans.executeSql('INSERT INTO settings (categorie, afstand, waardering) VALUES (?,?,?)', [ categorie, afstand, waardering ]);
        alert("Settings opgeslagen");
    }, errorCB);

}

function clearTable()
{
    db.transaction(function(trans){ 
        trans.executeSql('DELETE FROM settings');
    }, errorCB);
}



