export const add_scrolling_event = () => {
  // Code pour ajouter un écouteur d'événement à tous les liens d'ancre dans la page
  document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne tous les liens d'ancre
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    // Ajoute un écouteur d'événement de clic à chaque lien d'ancre
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => { // Utilisation d'une fonction fléchée ici
        e.preventDefault(); // Empêche le comportement par défaut du lien

        const anchorId = (e.currentTarget as HTMLAnchorElement).getAttribute('href'); // Récupère l'ID de l'ancre
        if (anchorId) {
          scrollToAnchor(anchorId); // Appelle la fonction pour défilement avec décalage
        }
      });
    });
  });
}

// Fonction pour gérer le défilement avec décalage
function scrollToAnchor(anchorId: string) {
  // Sélectionner l'élément d'ancrage par son ID
  const anchorElement = document.querySelector(anchorId);
  if (!anchorElement) {
    console.error(`Element with ID ${anchorId} not found.`);
    return;
  }

  // Obtenir la hauteur de l'en-tête
  const header = document.querySelector('header');
  if (!header) {
    console.error('Header element not found.');
    return;
  }
  const headerHeight = header.offsetHeight;

  // Calculer la position de défilement avec le décalage
  const offset = headerHeight * 1.1;
  const scrollPosition = anchorElement.getBoundingClientRect().top + window.pageYOffset - offset;

  // Animation de défilement
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });
}
