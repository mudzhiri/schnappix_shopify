/**
 * SCHNAPPIX 24/7 Smooth Scroll to Sections
 * Automatically scrolls to sections when clicking anchor links
 */

class SmoothScrollToSections {
  constructor() {
    this.init();
  }

  init() {
    // Handle all anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        this.scrollToElement(targetElement);
      }
    });

    // Handle hash in URL on page load
    if (window.location.hash) {
      setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          this.scrollToElement(targetElement);
        }
      }, 100);
    }
  }

  scrollToElement(element) {
    const headerHeight = 80; // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SmoothScrollToSections();
  });
} else {
  new SmoothScrollToSections();
}

// Re-initialize for theme editor
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    new SmoothScrollToSections();
  });
}

