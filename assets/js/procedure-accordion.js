document.addEventListener('DOMContentLoaded', function() {
  // Get all accordion cards
  const accordionCards = document.querySelectorAll('.accordion-card');
  
  // Add click handler to toggle the revealed state
  accordionCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      // Toggle the 'revealed' class to swap visible content
      this.classList.toggle('revealed');
    });
  });
});