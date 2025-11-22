/**
 * SCHNAPPIX 24/7 Hero Section JavaScript
 * Advanced animations: typing effect, smooth scroll
 */

class SchnappixHero {
  constructor() {
    this.hero = document.querySelector('.hero-schnappix--animated');
    if (!this.hero) return;

    this.headline = this.hero.querySelector('.hero-schnappix__headline');
    this.button = this.hero.querySelector('.hero-schnappix__button');
    
    this.init();
  }

  init() {
    // Typing animation for headline (if enabled)
    if (this.headline && this.hero.classList.contains('hero-schnappix--animated')) {
      this.initTypingAnimation();
    }

    // Smooth scroll for CTA button
    if (this.button) {
      this.initSmoothScroll();
    }
  }

  /**
   * Typing animation for headline
   */
  initTypingAnimation() {
    const originalText = this.headline.textContent.trim();
    this.headline.textContent = '';
    this.headline.style.opacity = '1';
    this.headline.style.transform = 'none';

    let index = 0;
    const typingSpeed = 50; // milliseconds per character

    const typeChar = () => {
      if (index < originalText.length) {
        this.headline.textContent += originalText.charAt(index);
        index++;
        setTimeout(typeChar, typingSpeed);
      }
    };

    // Start typing after card animation
    setTimeout(() => {
      typeChar();
    }, 1500);
  }

  /**
   * Smooth scroll for CTA button
   */
  initSmoothScroll() {
    this.button.addEventListener('click', (e) => {
      const href = this.button.getAttribute('href');
      
      // Only handle smooth scroll for anchor links
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SchnappixHero();
  });
} else {
  new SchnappixHero();
}

// Re-initialize for theme editor
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    new SchnappixHero();
  });
}

