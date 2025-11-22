/**
 * SCHNAPPIX 24/7 Animation Controller
 * Handles scroll-triggered animations and loading screen
 */

class SchnappixAnimations {
  constructor() {
    this.observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };
    
    this.init();
  }

  init() {
    // Initialize scroll animations
    this.setupScrollAnimations();
    
    // Initialize loading screen
    this.setupLoadingScreen();
    
    // Initialize product card animations
    this.setupProductCardAnimations();
  }

  /**
   * Setup scroll-triggered animations using Intersection Observer
   */
  setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      document.querySelectorAll('.section-animate, .section-animate-stagger, .featured-collection').forEach(el => {
        el.classList.add('animate');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.section-animate, .section-animate-stagger, .featured-collection, .image-reveal, .text-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Setup loading screen
   */
  setupLoadingScreen() {
    const loader = document.querySelector('.schnappix-loader');
    if (!loader) return;

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 800);
    });

    // Fallback: hide after 3 seconds max
    setTimeout(() => {
      if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
      }
    }, 3000);
  }

  /**
   * Setup product card hover effects
   */
  setupProductCardAnimations() {
    const cards = document.querySelectorAll('.product-card-wrapper');
    
    if (cards.length === 0) {
      // Try again after a delay in case cards load later
      setTimeout(() => {
        this.setupProductCardAnimations();
      }, 500);
      return;
    }
    
    cards.forEach((card, index) => {
      // Force initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = 'none';
      
      // Add entrance animation delay based on index
      const delay = index * 0.15;
      card.style.animationDelay = `${delay}s`;
      
      // Trigger animation after a small delay
      setTimeout(() => {
        card.style.transition = '';
        // Force animation to complete
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 1000 + (delay * 1000));
      }, 100);
    });
  }

  /**
   * Manually trigger animation for an element
   */
  triggerAnimation(element) {
    if (element) {
      element.classList.add('animate');
    }
  }

  /**
   * Reset animation for an element
   */
  resetAnimation(element) {
    if (element) {
      element.classList.remove('animate');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.schnappixAnimations = new SchnappixAnimations();
  });
} else {
  window.schnappixAnimations = new SchnappixAnimations();
}

// Re-initialize on dynamic content load (for theme editor)
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    if (window.schnappixAnimations) {
      window.schnappixAnimations.setupScrollAnimations();
      window.schnappixAnimations.setupProductCardAnimations();
    }
  });
}

