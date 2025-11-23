/**
 * Premium Header JavaScript for Schnappix 24/7
 * Handles animations, sticky scroll, menu drawer, and cart updates
 */

class SchnappixHeaderPremium {
  constructor() {
    this.header = document.querySelector('[data-header-premium]');
    this.hamburger = document.querySelector('[data-menu-toggle]');
    this.drawer = document.querySelector('[data-menu-drawer]');
    this.drawerOverlay = document.querySelector('[data-menu-overlay]');
    this.drawerClose = document.querySelector('[data-menu-close]');
    this.searchToggle = document.querySelector('[data-search-toggle]');
    this.cartIcon = document.querySelector('[data-cart-icon]');
    this.cartCount = document.querySelector('[data-cart-count]');
    
    this.isScrolled = false;
    this.isDrawerOpen = false;
    
    this.init();
  }

  init() {
    if (!this.header) return;

    // Force animations to trigger
    this.triggerAnimations();

    // Sticky scroll handler
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Menu drawer handlers
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleDrawer());
    }

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    }

    if (this.drawerClose) {
      this.drawerClose.addEventListener('click', () => this.closeDrawer());
    }

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen) {
        this.closeDrawer();
      }
    });

    // Search handler (can be extended)
    if (this.searchToggle) {
      this.searchToggle.addEventListener('click', () => {
        // Trigger Shopify predictive search or custom search
        if (window.theme && window.theme.predictiveSearch) {
          window.theme.predictiveSearch.open();
        }
      });
    }

    // Cart count update (listen to cart events)
    this.updateCartCount();
    document.addEventListener('cart:updated', () => this.updateCartCount());
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > 40;

    if (shouldBeScrolled !== this.isScrolled) {
      this.isScrolled = shouldBeScrolled;
      
      if (this.isScrolled) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }
  }

  toggleDrawer() {
    if (this.isDrawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    if (!this.drawer || !this.hamburger) return;

    this.isDrawerOpen = true;
    this.drawer.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus trap
    const firstFocusable = this.drawer.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  closeDrawer() {
    if (!this.drawer || !this.hamburger) return;

    this.isDrawerOpen = false;
    this.drawer.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Return focus to hamburger
    this.hamburger.focus();
  }

  triggerAnimations() {
    // Force animations by re-triggering them
    requestAnimationFrame(() => {
      const hamburger = this.header.querySelector('.schnappix-header-premium__hamburger');
      const logoLink = this.header.querySelector('.schnappix-header-premium__logo-link');
      const icons = this.header.querySelectorAll('.schnappix-header-premium__icon');

      if (hamburger) {
        hamburger.classList.add('animate');
        // Reset and retrigger
        setTimeout(() => {
          hamburger.style.animation = 'none';
          requestAnimationFrame(() => {
            hamburger.style.animation = '';
            hamburger.style.animation = 'slideInFromLeft 0.18s ease-out 0.1s forwards';
          });
        }, 10);
      }

      if (logoLink) {
        logoLink.classList.add('animate');
        setTimeout(() => {
          logoLink.style.animation = 'none';
          requestAnimationFrame(() => {
            logoLink.style.animation = '';
            logoLink.style.animation = 'logoFadeIn 0.22s ease 0.15s forwards';
          });
        }, 10);
      }

      icons.forEach((icon, index) => {
        icon.classList.add('animate');
        const delay = 0.25 + (index * 0.08);
        setTimeout(() => {
          icon.style.animation = 'none';
          requestAnimationFrame(() => {
            icon.style.animation = '';
            icon.style.animation = `flyInFromBottomLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s forwards`;
          });
        }, 10);
      });
    });
  }

  updateCartCount() {
    if (!this.cartCount) return;

    // Get cart count from Shopify cart object or fetch it
    if (window.theme && window.theme.cart) {
      const count = window.theme.cart.item_count || 0;
      if (count > 0) {
        this.cartCount.textContent = count;
        this.cartCount.style.display = 'flex';
      } else {
        this.cartCount.style.display = 'none';
      }
    } else {
      // Fallback: fetch cart count via fetch API
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          const count = cart.item_count || 0;
          if (count > 0) {
            this.cartCount.textContent = count;
            this.cartCount.style.display = 'flex';
          } else {
            this.cartCount.style.display = 'none';
          }
        })
        .catch(() => {
          this.cartCount.style.display = 'none';
        });
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SchnappixHeaderPremium();
  });
} else {
  new SchnappixHeaderPremium();
}

// Re-initialize on section load (Shopify theme editor)
document.addEventListener('shopify:section:load', (event) => {
  if (event.detail.sectionId.includes('schnappix-header-premium')) {
    new SchnappixHeaderPremium();
  }
});

