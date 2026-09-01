document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('[data-category]');
  
  // Initialize: show only governance cards by default
  initializeFilter();
  
  // Add click event listeners to filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Filter cards based on selected category
      const filterValue = this.getAttribute('data-filter');
      filterCards(filterValue);
    });
  });
  
  function initializeFilter() {
    // Set governance tab as active
    const governanceTab = document.querySelector('[data-filter="governance"]');
    if (governanceTab) {
      governanceTab.classList.add('active');
    }
    
    // Show governance cards, hide others
    filterCards('governance');
  }
  
  function filterCards(category) {
    projectCards.forEach(card => {
      if (category === 'all') {
        // Show all cards
        card.classList.remove('project-card-hidden');
      } else if (card.getAttribute('data-category') === category) {
        // Show matching category cards
        card.classList.remove('project-card-hidden');
      } else {
        // Hide non-matching cards
        card.classList.add('project-card-hidden');
      }
    });
  }
});