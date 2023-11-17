$(document).ready(function() {
    // Fonction pour mettre à jour le contenu d'un élément div
    function updateData(elementId, data) {
        $('#' + elementId).html('Données reçues : ' + JSON.stringify(data));
    }

    // Requêtes AJAX
    $.ajax({
        url: 'http://127.0.0.1:8000/temperatur/',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            updateData('temperatur-data', data);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8000/humidite/',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            updateData('humidite-data', data);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:8000/pression/',
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            updateData('pression-data', data);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    });
});
