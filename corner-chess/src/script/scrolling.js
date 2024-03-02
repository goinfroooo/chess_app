export const add_scrolling_event = () => {

// Code pour ajouter un écouteur d'événement à tous les liens d'ancre dans la page
  $(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault(); // Empêche le comportement par défaut du lien

      var anchorId = $(this).attr('href'); // Récupère l'ID de l'ancre
      scrollToAnchor(anchorId); // Appelle la fonction pour défilement avec décalage
    });
  });
  
}
  // Fonction pour gérer le défilement avec décalage
  function scrollToAnchor(anchorId) {
    var headerHeight = document.querySelector('header').offsetHeight; // Hauteur du header
    var offset = headerHeight; // Décalage, vous pouvez ajuster ce nombre selon votre besoin

    // Animation de défilement
    $('html, body').animate({
      scrollTop: $(anchorId).offset().top - offset*1.1
    }, 500);
  }
