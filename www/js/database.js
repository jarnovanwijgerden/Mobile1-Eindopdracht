
var db;


$(document).ready(function()
{
    // document.addEventListener("deviceready", function(){
    //   initializeDatabase();
    //   },true);

    initializeDatabase();
});


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

function getSettings(callback) {

    var categorie = "";
    var afstand = "";
    var waardering = "":
    alert("1");
    db.transaction(function(trans)
    { 
        alert("2");
        trans.executeSql('SELECT * FROM settings', [], function(trans, results)
        {
            alert("3");
            var len = results.rows.length;
            if(len>0)
            {
                alert("4");
                categorie = results.rows.item(0).categorie;
                afstand = results.rows.item(0).afstand;
                waardering = results.rows.item(0).waardering;
            }

        }, errorCB);
    }, errorCB);
    callback(categorie, afstand, waardering);
}

function SaveSettings(categorie, afstand, waardering)
{
    clearTable();
    db.transaction(function(trans){ 
        trans.executeSql('INSERT INTO settings (categorie, afstand, waardering) VALUES (?,?,?)', [ categorie, afstand, waardering ]);
    }, errorCB);

}

function clearTable()
{
    db.transaction(function(trans){ 
        trans.executeSql('DELETE FROM settings');
    }, errorCB);
}


