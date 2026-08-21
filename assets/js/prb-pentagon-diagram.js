/**
 * Pentagon Diagram - Draws connecting lines between 5 nodes in a pentagon shape
 * Renders SVG lines behind the node images
 */

function initPentagonDiagram() {
  const svg = document.getElementById('pentagonSvg');
  const container = document.querySelector('.diagram-desktop-container');
  
  if (!svg || !container) return;
  
  // Pentagon node positions (as percentages of container)
  const positions = {
    top: { x: 50, y: 0 },           // Node 1
    'upper-right': { x: 90.9, y: 14.64 },    // Node 2
    'lower-right': { x: 90.9, y: 85.36 },    // Node 3
    'lower-left': { x: 9.1, y: 85.36 },      // Node 4
    'upper-left': { x: 9.1, y: 14.64 }       // Node 5
  };
  
  // Pentagon connection order: 1→2→3→4→5→1
  const connections = [
    ['top', 'upper-right'],
    ['upper-right', 'lower-right'],
    ['lower-right', 'lower-left'],
    ['lower-left', 'upper-left'],
    ['upper-left', 'top']
  ];
  
  function updateSvg() {
    const rect = container.getBoundingClientRect();
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Clear existing lines
    svg.innerHTML = '';
    
    // Set SVG dimensions
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    
    // Draw connecting lines
    connections.forEach(([from, to]) => {
      const p1 = positions[from];
      const p2 = positions[to];
      
      const x1 = (p1.x / 100) * width;
      const y1 = (p1.y / 100) * height;
      const x2 = (p2.x / 100) * width;
      const y2 = (p2.y / 100) * height;
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#D4A574');
      line.setAttribute('stroke-width', '4');
      line.setAttribute('stroke-linecap', 'round');
      
      svg.appendChild(line);
    });
  }
  
  // Initial render
  updateSvg();
  
  // Re-render on window resize
  window.addEventListener('resize', updateSvg);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPentagonDiagram);
} else {
  initPentagonDiagram();
}