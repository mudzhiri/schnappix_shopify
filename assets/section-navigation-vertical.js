/**
 * Vertical Section Navigation Bar v1
 * Version: 1.0
 * Brand: SCHNAPPIX 24/7
 * Uses IntersectionObserver for scroll-triggered activation
 */

(function() {
  'use strict';

  class VerticalNavV1 {
    constructor(section) {
      this.section = section;
      this.nav = section.querySelector('[data-vertical-nav]');
      this.markers = section.querySelectorAll('.vnav-v1__marker');
      this.observers = [];
      this.activeMarker = null;
      this.sections = [];
      
      if (!this.nav || this.markers.length === 0) return;
      
      this.init();
    }

    init() {
      // Get section IDs from markers
      this.markers.forEach(marker => {
        const sectionId = marker.getAttribute('data-section-id');
        if (sectionId) {
          const targetSection = document.getElementById(sectionId) || 
                               document.querySelector(`[id*="${sectionId}"]`) ||
                               document.querySelector(`#${sectionId}`);
          
          if (targetSection) {
            this.sections.push({
              id: sectionId,
              element: targetSection,
              marker: marker
            });
          }
        }
      });

      if (this.sections.length === 0) {
        console.warn('VerticalNav v1: No sections found to observe');
        return;
      }

      // Setup IntersectionObserver for each section
      this.setupObservers();

      // Setup click handlers for smooth scroll
      this.setupClickHandlers();

      // Apply hide settings
      const hideMobile = this.section.dataset.hideMobile === 'true';
      const hideDesktop = this.section.dataset.hideDesktop === 'true';
      
      if (hideMobile) {
        this.nav.setAttribute('data-hide-mobile', 'true');
      }
      if (hideDesktop) {
        this.nav.setAttribute('data-hide-desktop', 'true');
      }
    }

    setupObservers() {
      // Check for IntersectionObserver support
      if (typeof IntersectionObserver === 'undefined') {
        this.fallbackActivation();
        return;
      }

      const options = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Section is active when 20% from top/bottom
        threshold: [0, 0.1, 0.5, 1.0]
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const sectionData = this.sections.find(s => s.element === entry.target);
          if (!sectionData) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            this.setActiveMarker(sectionData.marker);
          }
        });
      }, options);

      // Observe all sections
      this.sections.forEach(sectionData => {
        this.observer.observe(sectionData.element);
      });
    }

    setActiveMarker(marker) {
      if (this.activeMarker === marker) return;

      // Remove active class from all markers
      this.markers.forEach(m => m.classList.remove('vnav-v1__marker--active'));

      // Add active class to new marker
      marker.classList.add('vnav-v1__marker--active');
      this.activeMarker = marker;

      // Update ARIA attributes
      this.markers.forEach(m => {
        m.setAttribute('aria-current', m === marker ? 'true' : 'false');
      });
    }

    setupClickHandlers() {
      this.markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
          e.preventDefault();
          const sectionId = marker.getAttribute('data-section-id');
          const targetSection = this.sections.find(s => s.id === sectionId);
          
          if (targetSection) {
            this.smoothScrollTo(targetSection.element);
          }
        });
      });
    }

    smoothScrollTo(element) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    fallbackActivation() {
      // Fallback for browsers without IntersectionObserver
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const viewportCenter = scrollY + (windowHeight / 2);

            // Find section closest to viewport center
            let closestSection = null;
            let closestDistance = Infinity;

            this.sections.forEach(sectionData => {
              const rect = sectionData.element.getBoundingClientRect();
              const sectionTop = scrollY + rect.top;
              const sectionBottom = sectionTop + rect.height;
              const sectionCenter = sectionTop + (rect.height / 2);

              const distance = Math.abs(viewportCenter - sectionCenter);

              if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestSection = sectionData;
                }
              }
            });

            if (closestSection) {
              this.setActiveMarker(closestSection.marker);
            }

            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Initialize all vertical navigation sections
  function initVerticalNavs() {
    const sections = document.querySelectorAll('[data-vertical-nav]');
    
    sections.forEach(nav => {
      const section = nav.closest('section');
      if (section && !section.dataset.vnavInitialized) {
        section.dataset.vnavInitialized = 'true';
        new VerticalNavV1(section);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVerticalNavs);
  } else {
    initVerticalNavs();
  }

  // Re-initialize on section load (Shopify Theme Editor)
  document.addEventListener('shopify:section:load', (event) => {
    if (event.detail.sectionId && event.detail.sectionId.includes('section-navigation-vertical')) {
      setTimeout(initVerticalNavs, 100);
    }
  });

  // Re-initialize when other sections load (to detect new sections)
  document.addEventListener('shopify:section:load', () => {
    setTimeout(initVerticalNavs, 200);
  });

})();

