document.addEventListener('click', (event) => {
  if (event.target.classList.contains('has-tooltip')) {
    event.preventDefault();
    const tooltipTitle = event.target.getAttribute('title');
    const tooltipPosition = event.target.getAttribute('data-position');
    let tooltipElement = document.querySelector('.tooltip');

    if (tooltipElement) {
      tooltipElement.remove();
    }

    tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip', 'tooltip_active');
    tooltipElement.textContent = tooltipTitle;
    event.target.insertAdjacentElement('afterEnd', tooltipElement);

    const rect = event.target.getBoundingClientRect();
    const tooltipWidth = tooltipElement.offsetWidth;
    const tooltipHeight = tooltipElement.offsetHeight;

    let left, top;

    switch (tooltipPosition) {
      case 'top':
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        top = rect.top - tooltipHeight;
        break;
      case 'left':
        left = rect.left - tooltipWidth;
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case 'right':
        left = rect.right;
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case 'bottom':
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        top = rect.bottom;
        break;
      default:
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        top = rect.top - tooltipHeight;
    }

    tooltipElement.style.left = left + 'px';
    tooltipElement.style.top = top + 'px';
  }
})