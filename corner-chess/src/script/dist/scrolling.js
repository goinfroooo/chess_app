"use strict";
exports.__esModule = true;
exports.add_scrolling_event = void 0;
exports.add_scrolling_event = function () {
    // Code pour ajouter un écouteur d'événement à tous les liens d'ancre dans la page
    document.addEventListener('DOMContentLoaded', function () {
        // Sélectionne tous les liens d'ancre
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        // Ajoute un écouteur d'événement de clic à chaque lien d'ancre
        anchorLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault(); // Empêche le comportement par défaut du lien
                var anchorId = e.currentTarget.getAttribute('href'); // Récupère l'ID de l'ancre
                if (anchorId) {
                    scrollToAnchor(anchorId); // Appelle la fonction pour défilement avec décalage
                }
            });
        });
    });
};
// Fonction pour gérer le défilement avec décalage
function scrollToAnchor(anchorId) {
    // Sélectionner l'élément d'ancrage par son ID
    var anchorElement = document.querySelector(anchorId);
    if (!anchorElement) {
        console.error("Element with ID " + anchorId + " not found.");
        return;
    }
    // Obtenir la hauteur de l'en-tête
    var header = document.querySelector('header');
    if (!header) {
        console.error('Header element not found.');
        return;
    }
    var headerHeight = header.offsetHeight;
    // Calculer la position de défilement avec le décalage
    var offset = headerHeight * 1.1;
    var scrollPosition = anchorElement.getBoundingClientRect().top + window.pageYOffset - offset;
    // Animation de défilement
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}
