document.addEventListener('DOMContentLoaded', function() {
  // Get all flip card wrappers
  const flipCardWrappers = document.querySelectorAll('.flip-card-wrapper');
  
  // Add click handler to toggle between front and back content
  flipCardWrappers.forEach(wrapper => {
    wrapper.addEventListener('click', function(e) {
      e.preventDefault();
      // Toggle the 'flipped' class to swap visible content
      this.classList.toggle('flipped');
    });
  });
});