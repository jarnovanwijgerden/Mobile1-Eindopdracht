


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
    //db = window.openDatabase("Database", "1.0", "eet.nu", 2 * 1024 * 1024);
    db = window.sqlitePlugin.openDatabase({name: "eet.nu"});
    // db.transaction(function(trans)
    // { 
    //     trans.executeSql('CREATE TABLE IF NOT EXISTS settings (categorie TEXT, afstand TEXT, waardering BOOLEAN)');
    // }, errorCB);
     db.transaction(function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS settings');
            tx.executeSql('CREATE TABLE IF NOT EXISTS settings (categorie TEXT, afstand TEXT, waardering BOOLEAN)');
            alert("DB AANGEMAAKT");
    });
}

function errorCB(err) {
    alert("Error processing SQL: " + err.message);
    return true;
}

function getSettings(callback) {


    db.transaction(function(tx) {
            tx.executeSql("select categorie, afstand, waardering from settings;", [], function(tx, res) {

            alert("In de settings");
            var len = res.rows.length;
            if(len>0)
            {
                categorie = res.rows.item(0).categorie;
                afstand = res.rows.item(0).afstand;
                waardering = res.rows.item(0).waardering;
                succes(categorie, afstand, waardering);
            }

            callback(categorie, afstand, waardering);

            });
   });




    // var categorie = "";
    // var afstand = "";
    // var waardering = "";
    // alert("ioN DE SETTINGS");
    // db.transaction(function(trans)
    // { 
    //     alert("In de dbtans");
    //     trans.executeSql('SELECT * FROM settings', [], function(trans, results)
    //     {
    //         alert("in de select statement");
    //         var len = results.rows.length;
    //         if(len>0)
    //         {
    //             categorie = results.rows.item(0).categorie;
    //             afstand = results.rows.item(0).afstand;
    //             waardering = results.rows.item(0).waardering;
    //             succes(categorie, afstand, waardering);
    //         }
    //     }, 
    //     function(err)
    //     {
    //         error(err);
    //     });
    // }, 
    // function(err)
    // {
    //      error(err);
    // });
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



