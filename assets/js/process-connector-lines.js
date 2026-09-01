/**
 * Process Connector Lines - Draws horizontal lines between consecutive process nodes (desktop)
 * Mobile uses CSS-based vertical connectors via ::before pseudo-elements
 */

function initProcessConnectorLines() {
  const svg = document.querySelector('.process-connector-svg');
  const container = document.querySelector('.process-nodes-flexbox');
  const nodePairs = document.querySelectorAll('.process-node-pair');
  
  if (!svg || !container || nodePairs.length < 2) return;
  
  function updateConnectors() {
    // Only render if we're in desktop layout (horizontal flexbox)
    const isDesktop = window.getComputedStyle(container).flexDirection === 'row';
    
    if (!isDesktop) {
      // On mobile, clear the SVG since CSS handles connectors
      svg.innerHTML = '';
      return;
    }
    
    svg.innerHTML = '';
    
    const svgRect = container.getBoundingClientRect();
    const containerLeft = 0;
    const containerTop = 0;
    
    // Image vertical position (37.5px since images are 75px and centered at top)
    const imageVerticalMidpoint = 37.5; // Half of 75px image height
    
    // Draw lines between consecutive pairs (1→2, 2→3, 3→4, 4→5)
    for (let i = 0; i < nodePairs.length - 1; i++) {
      const currentPair = nodePairs[i];
      const nextPair = nodePairs[i + 1];
      
      const currentRect = currentPair.getBoundingClientRect();
      const nextRect = nextPair.getBoundingClientRect();
      
      // Get positions relative to container
      const x1 = currentRect.left - svgRect.left + currentRect.width / 2;
      const y1 = containerTop + imageVerticalMidpoint;
      
      const x2 = nextRect.left - svgRect.left + nextRect.width / 2;
      const y2 = containerTop + imageVerticalMidpoint;
      
      // Create line element
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.setAttribute('stroke', '#D4A574');
      line.setAttribute('stroke-width', '4');
      line.setAttribute('stroke-linecap', 'round');
      
      svg.appendChild(line);
    }
    
    // Draw loop-back curve from node 5 to node 1
    if (nodePairs.length >= 2) {
      const firstPair = nodePairs[0];
      const lastPair = nodePairs[nodePairs.length - 1];
      
      const firstRect = firstPair.getBoundingClientRect();
      const lastRect = lastPair.getBoundingClientRect();
      
      const x1 = lastRect.left - svgRect.left + lastRect.width / 2;
      const x2 = firstRect.left - svgRect.left + firstRect.width / 2;
      
      // Position curve below the images
      const curveBottomY = container.offsetHeight - 20;
      const curveControlY = container.offsetHeight + 30;
      
      // Create curved path using quadratic bezier curve
      const pathData = `M ${x1} ${curveBottomY} Q ${(x1 + x2) / 2} ${curveControlY} ${x2} ${curveBottomY}`;
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', '#D4A574');
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.5');
      
      svg.appendChild(path);
      
      // Add small arrow indicator at the end
      const arrowSize = 6;
      const arrowAngle = Math.PI * 2; // Pointing right towards node 1
      
      const arrowX = x2;
      const arrowY = curveBottomY;
      const arrowTip1X = arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
      const arrowTip1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
      const arrowTip2X = arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
      const arrowTip2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);
      
      const arrowPath = `M ${arrowX} ${arrowY} L ${arrowTip1X} ${arrowTip1Y} M ${arrowX} ${arrowY} L ${arrowTip2X} ${arrowTip2Y}`;
      
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      arrow.setAttribute('d', arrowPath);
      arrow.setAttribute('stroke', '#D4A574');
      arrow.setAttribute('stroke-width', '2.5');
      arrow.setAttribute('stroke-linecap', 'round');
      arrow.setAttribute('stroke-linejoin', 'round');
      arrow.setAttribute('fill', 'none');
      arrow.setAttribute('opacity', '0.5');
      
      svg.appendChild(arrow);
    }
    
    // Update SVG viewBox and size to accommodate loop curve
    svg.setAttribute('viewBox', `0 0 ${container.offsetWidth} ${container.offsetHeight + 50}`);
  }
  
  // Initial render
  updateConnectors();
  
  // Re-render on window resize
  window.addEventListener('resize', updateConnectors);
  
  // Re-render after images load
  document.querySelectorAll('.process-node-image').forEach(img => {
    img.addEventListener('load', updateConnectors);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProcessConnectorLines);
} else {
  initProcessConnectorLines();
}