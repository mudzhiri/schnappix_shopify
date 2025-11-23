/**
 * Schnappix Hero Section v1
 * Animation controller with Intersection Observer
 * Version: 1.0
 */

(function() {
  'use strict';

  class SchnappixHeroV1 {
    constructor(section) {
      this.section = section;
      this.content = section.querySelector('[data-hero-content]');
      this.title = section.querySelector('[data-hero-title]');
      this.subtitle = section.querySelector('[data-hero-subtitle]');
      this.buttons = section.querySelector('[data-hero-buttons]');
      this.button1 = section.querySelector('[data-hero-button-1]');
      this.button2 = section.querySelector('[data-hero-button-2]');
      this.backgroundImages = section.querySelectorAll('[data-parallax="true"]');
      this.video = section.querySelector('.shx-hero-v1-background-video');
      
      this.settings = {
        animation: section.dataset.animation || 'fade',
        duration: parseInt(section.dataset.duration) || 800,
        delay: parseInt(section.dataset.delay) || 0,
        easing: section.dataset.easing || 'ease-out',
        parallax: section.dataset.parallax === 'true',
        kenBurn: section.dataset.kenBurn === 'true'
      };
      
      this.isAnimated = false;
      this.observer = null;
      
      this.init();
    }

    init() {
      if (!this.content) return;

      // Set initial state
      this.content.setAttribute('data-animated', 'false');

      // Setup Intersection Observer
      this.setupObserver();

      // Setup Parallax
      if (this.settings.parallax) {
        this.setupParallax();
      }

      // Setup Ken-Burn for video
      if (this.settings.kenBurn && this.video) {
        this.setupKenBurn();
      }

      // Apply hide settings
      const hideMobile = this.section.dataset.hideMobile === 'true';
      const hideDesktop = this.section.dataset.hideDesktop === 'true';
      
      if (hideMobile) {
        this.section.setAttribute('data-hide-mobile', 'true');
      }
      if (hideDesktop) {
        this.section.setAttribute('data-hide-desktop', 'true');
      }
    }

    setupObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isAnimated) {
            this.animate();
            this.isAnimated = true;
          }
        });
      }, options);

      this.observer.observe(this.section);
    }

    animate() {
      const delay = this.settings.delay;
      const duration = this.settings.duration;
      const easing = this.settings.easing;

      switch (this.settings.animation) {
        case 'fade':
          this.animateFade(delay, duration, easing);
          break;
        case 'slide-up':
          this.animateSlideUp(delay, duration, easing);
          break;
        case 'slide-left':
          this.animateSlideLeft(delay, duration, easing);
          break;
        case 'zoom-in':
          this.animateZoomIn(delay, duration, easing);
          break;
        case 'fly-in':
          this.animateFlyIn(delay, duration, easing);
          break;
        default:
          // No animation - show immediately
          this.showAll();
      }
    }

    animateFade(delay, duration, easing) {
      const elements = [this.title, this.subtitle, this.button1, this.button2].filter(Boolean);
      
      elements.forEach((el, index) => {
        el.animate(
          [
            { opacity: 0 },
            { opacity: 1 }
          ],
          {
            duration: duration,
            delay: delay + (index * 150),
            easing: easing,
            fill: 'forwards'
          }
        );
      });

      setTimeout(() => {
        this.content.setAttribute('data-animated', 'true');
      }, delay + duration + (elements.length * 150));
    }

    animateSlideUp(delay, duration, easing) {
      const elements = [this.title, this.subtitle, this.button1, this.button2].filter(Boolean);
      
      elements.forEach((el, index) => {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(40px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          {
            duration: duration,
            delay: delay + (index * 150),
            easing: easing,
            fill: 'forwards'
          }
        );
      });

      setTimeout(() => {
        this.content.setAttribute('data-animated', 'true');
      }, delay + duration + (elements.length * 150));
    }

    animateSlideLeft(delay, duration, easing) {
      const elements = [this.title, this.subtitle, this.button1, this.button2].filter(Boolean);
      
      elements.forEach((el, index) => {
        el.animate(
          [
            { opacity: 0, transform: 'translateX(-40px)' },
            { opacity: 1, transform: 'translateX(0)' }
          ],
          {
            duration: duration,
            delay: delay + (index * 150),
            easing: easing,
            fill: 'forwards'
          }
        );
      });

      setTimeout(() => {
        this.content.setAttribute('data-animated', 'true');
      }, delay + duration + (elements.length * 150));
    }

    animateZoomIn(delay, duration, easing) {
      const elements = [this.title, this.subtitle, this.button1, this.button2].filter(Boolean);
      
      elements.forEach((el, index) => {
        el.animate(
          [
            { opacity: 0, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'scale(1)' }
          ],
          {
            duration: duration,
            delay: delay + (index * 150),
            easing: easing,
            fill: 'forwards'
          }
        );
      });

      setTimeout(() => {
        this.content.setAttribute('data-animated', 'true');
      }, delay + duration + (elements.length * 150));
    }

    animateFlyIn(delay, duration, easing) {
      // Title from top
      if (this.title) {
        this.title.animate(
          [
            { opacity: 0, transform: 'translateY(-60px) scale(0.9)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' }
          ],
          {
            duration: duration,
            delay: delay,
            easing: easing,
            fill: 'forwards'
          }
        );
      }

      // Subtitle from left
      if (this.subtitle) {
        this.subtitle.animate(
          [
            { opacity: 0, transform: 'translateX(-40px)' },
            { opacity: 1, transform: 'translateX(0)' }
          ],
          {
            duration: duration,
            delay: delay + 200,
            easing: easing,
            fill: 'forwards'
          }
        );
      }

      // Buttons from right (staggered)
      if (this.button1) {
        this.button1.animate(
          [
            { opacity: 0, transform: 'translateX(40px) scale(0.9)' },
            { opacity: 1, transform: 'translateX(0) scale(1)' }
          ],
          {
            duration: duration,
            delay: delay + 400,
            easing: easing,
            fill: 'forwards'
          }
        );
      }

      if (this.button2) {
        this.button2.animate(
          [
            { opacity: 0, transform: 'translateX(40px) scale(0.9)' },
            { opacity: 1, transform: 'translateX(0) scale(1)' }
          ],
          {
            duration: duration,
            delay: delay + 600,
            easing: easing,
            fill: 'forwards'
          }
        );
      }

      setTimeout(() => {
        this.content.setAttribute('data-animated', 'true');
      }, delay + duration + 600);
    }

    showAll() {
      const elements = [this.title, this.subtitle, this.button1, this.button2].filter(Boolean);
      elements.forEach(el => {
        el.style.opacity = '1';
      });
      this.content.setAttribute('data-animated', 'true');
    }

    setupParallax() {
      if (this.backgroundImages.length === 0) return;

      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;

            this.backgroundImages.forEach(img => {
              img.style.transform = `translateY(${rate}px)`;
            });

            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupKenBurn() {
      if (!this.video) return;
      
      // Ken-Burn is handled by CSS animation
      // This method can be extended for additional video controls
    }
  }

  // Initialize all hero sections
  function initHeroSections() {
    const sections = document.querySelectorAll('[data-hero-v1]');
    
    sections.forEach(section => {
      // Get settings from data attributes or section settings
      const animation = section.dataset.animation || section.querySelector('[data-hero-content]')?.dataset.animation || 'fade';
      const duration = parseInt(section.dataset.duration) || 800;
      const delay = parseInt(section.dataset.delay) || 0;
      const easing = section.dataset.easing || 'ease-out';
      const parallax = section.dataset.parallax === 'true';
      const kenBurn = section.dataset.kenBurn === 'true';
      const hideMobile = section.dataset.hideMobile === 'true';
      const hideDesktop = section.dataset.hideDesktop === 'true';

      section.dataset.animation = animation;
      section.dataset.duration = duration;
      section.dataset.delay = delay;
      section.dataset.easing = easing;
      section.dataset.parallax = parallax;
      section.dataset.kenBurn = kenBurn;
      section.dataset.hideMobile = hideMobile;
      section.dataset.hideDesktop = hideDesktop;

      new SchnappixHeroV1(section);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSections);
  } else {
    initHeroSections();
  }

  // Re-initialize on section load (Shopify Theme Editor)
  document.addEventListener('shopify:section:load', (event) => {
    if (event.detail.sectionId && event.detail.sectionId.includes('schnappix-hero-v1')) {
      setTimeout(initHeroSections, 100);
    }
  });

})();

