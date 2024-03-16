$(document).ready(function() {
    // Fonction pour mettre à jour les données sur les pages HTML
    function updateData(elementId, data) {
        $('#' + elementId).html('Données reçues : ' + JSON.stringify(data)); 
    }

    // Requêtes AJAX pour récupérer les données de chaque capteur
    $.ajax({
        url: 'http://192.168.2.208:8080/data',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            updateData('son-data', data);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des données du capteur de son', error);
        }
    });

    $.ajax({
        url: 'http://192.168.2.208:8080/data',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            updateData('lumiere-data', data);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des données du capteur de lumière', error);
        }
    });

    $.ajax({
        url: 'http://192.168.2.208:8080/data',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            updateData('moisisure-data', data);
        },
        error: function(error) {
            console.error('Erreur lors de la récupération des données du capteur de moisissure', error);
        }
    });
});
$(document).ready(function() {
    // Fonction pour envoyer une requête POST de modification de capteur
    function modifySensor(newMeasurementType, newMeasurementValue) {
        // Données à envoyer dans la requête
        var requestData = {
            newMeasurementType: newMeasurementType,
            newMeasurementValue: newMeasurementValue
        };

        // Requête AJAX POST vers l'endpoint du serveur pour la modification du capteur
        $.ajax({
            url: 'http://192.168.2.208:8080/data/modifierCapteur',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function(response) {
                console.log('Modification du capteur effectuée avec succès:', response);
                // Mettre à jour l'affichage ou effectuer d'autres actions si nécessaire
            },
            error: function(error) {
                console.error('Erreur lors de la modification du capteur:', error);
                // Gérer les erreurs d'une manière appropriée
            }
        });
    }

    // Exemple d'utilisation de la fonction modifySensor
    $('#updateSensorForm').submit(function(event) {
        event.preventDefault();
        var newMeasurementType = $('#newMeasurementType').val();
        var newMeasurementValue = $('#newMeasurementValue').val();
        modifySensor(newMeasurementType, newMeasurementValue);
    });
});

document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    var objectName = document.getElementById('objectName').value;

    // Envoyer la requête de suppression au serveur
    fetch('http://192.168.2.208:8080/data/supprimerDonnee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ objectName: objectName })
    })
    .then(response => response.json())
    .then(data => {
        // Afficher la réponse du serveur
        document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => {
        console.error('Erreur lors de la suppression des données :', error);
        document.getElementById('responseMessage').innerText = 'Une erreur s\'est produite lors de la suppression.';
    });
});

//ajout 
$(document).ready(function () {
    // Écouteur d'événement pour la soumission du formulaire
    $("#addDataForm").submit(function (event) {
      event.preventDefault(); // Empêche la soumission du formulaire par défaut
  
      // Récupération des valeurs des champs du formulaire
      var objectName = $("#objectName").val();
      var objectIP = $("#objectIP").val();
      var dataType = $("#dataType").val();
  
      // Vérification du type de données sélectionné
      if (dataType === "capteur") {
        // Si c'est un capteur, afficher les champs supplémentaires
        var typeMesure = prompt("Entrez le type de mesure :");
        var valeur = prompt("Entrez la valeur :");
  
        // Envoi des données au serveur
        ajouterDonnee(objectName, objectIP, dataType, typeMesure, valeur);
      } else if (dataType === "actionneur") {
        // Si c'est un actionneur, afficher les champs supplémentaires
        var typeAction = prompt("Entrez le type d'action :");
  
        // Envoi des données au serveur
        ajouterDonnee(objectName, objectIP, dataType, typeAction, null);
      } else {
        alert("Type de données invalide.");
      }
    });
  
    // Fonction pour envoyer les données au serveur
    function ajouterDonnee(objectName, objectIP, dataType, param1, param2) {
      // Requête AJAX vers le serveur
      $.ajax({
        url: "http://192.168.2.208:8080/data/ajouterDonnee", // Remplacez par l'URL correcte de votre endpoint
        method: "POST",
        dataType: "json",
        data: {
          objectName: objectName,
          objectIP: objectIP,
          dataType: dataType,
          param1: param1,
          param2: param2,
        },
        success: function (response) {
          // Affichage du message de succès
          $("#responseMessage").html(response.message);
        },
        error: function (error) {
          console.error("Erreur lors de l'ajout des données :", error);
          // Affichage du message d'erreur
          $("#responseMessage").html("Une erreur s'est produite lors de l'ajout des données.");
        },
      });
    }
  });
  
 