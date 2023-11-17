$(document).ready(function() {
    // mis a jour des donnee pour les html
    function updateData(elementId, data) {
        $('#' + elementId).html('Données reçues : ' + JSON.stringify(data)); 
    }

    // Requêtes AJAX
    $.ajax({
        url: 'http://127.0.0.1:8000/temperatur/',
        method: 'GET',
        dataType: 'text',
        success: function(data) {
            updateData('temperatur-data', data);
        },
        error: function(error) {
            console.error('donnee temperature non recuperer', error);
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8000/humidite/',
        method: 'GET',
        dataType: 'text',
        success: function(data) {
            updateData('humidite-data', data);
        },
        error: function(error) {
            console.error('donnee humidite non recuperer', error);
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8000/pression/',
        method: 'GET',
        dataType: 'text',
        success: function(data) {

            updateData('pression-data', data);
        },
        error: function(error) {
            console.error('donnee pression non recuperer', error);
        }
    });
});
