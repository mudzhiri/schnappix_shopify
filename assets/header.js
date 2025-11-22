/**
 * Modern Header JavaScript
 * Handles hamburger menu toggle and drawer functionality
 */

class ModernHeader {
  constructor() {
    this.header = document.querySelector('[data-header-modern]');
    if (!this.header) return;

    this.menuToggle = this.header.querySelector('[data-menu-toggle]');
    this.menuDrawer = document.querySelector('[data-menu-drawer]');
    this.menuOverlay = this.menuDrawer?.querySelector('[data-menu-overlay]');
    this.menuClose = this.menuDrawer?.querySelector('[data-menu-close]');
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.menuToggle || !this.menuDrawer) return;

    // Menu toggle button
    this.menuToggle.addEventListener('click', () => this.toggleMenu());

    // Close button
    if (this.menuClose) {
      this.menuClose.addEventListener('click', () => this.closeMenu());
    }

    // Overlay click to close
    if (this.menuOverlay) {
      this.menuOverlay.addEventListener('click', () => this.closeMenu());
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu when clicking on drawer links
    const drawerLinks = this.menuDrawer?.querySelectorAll('a');
    if (drawerLinks) {
      drawerLinks.forEach((link) => {
        link.addEventListener('click', () => {
          // Small delay to allow navigation
          setTimeout(() => this.closeMenu(), 100);
        });
      });
    }

    // Handle submenu details
    const submenuDetails = this.menuDrawer?.querySelectorAll('details');
    if (submenuDetails) {
      submenuDetails.forEach((detail) => {
        detail.addEventListener('toggle', () => {
          // Prevent body scroll when submenu is open
          if (detail.open) {
            this.preventBodyScroll();
          } else {
            this.allowBodyScroll();
          }
        });
      });
    }

    // Prevent body scroll when menu is open
    this.observeMenuState();

    // Header shrink on scroll
    this.setupHeaderShrink();
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (!this.menuDrawer || !this.menuToggle) return;

    this.isOpen = true;
    this.menuDrawer.setAttribute('data-open', 'true');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.preventBodyScroll();

    // Focus trap
    this.trapFocus();
  }

  closeMenu() {
    if (!this.menuDrawer || !this.menuToggle) return;

    this.isOpen = false;
    this.menuDrawer.setAttribute('data-open', 'false');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.allowBodyScroll();

    // Return focus to toggle button
    this.menuToggle.focus();
  }

  preventBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  allowBodyScroll() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  trapFocus() {
    if (!this.menuDrawer) return;

    const focusableElements = this.menuDrawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    setTimeout(() => firstElement.focus(), 100);

    // Trap focus within drawer
    this.menuDrawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  observeMenuState() {
    if (!this.menuDrawer) return;

    const observer = new MutationObserver(() => {
      const isOpen = this.menuDrawer.getAttribute('data-open') === 'true';
      if (isOpen !== this.isOpen) {
        this.isOpen = isOpen;
        if (isOpen) {
          this.preventBodyScroll();
        } else {
          this.allowBodyScroll();
        }
      }
    });

    observer.observe(this.menuDrawer, {
      attributes: true,
      attributeFilter: ['data-open'],
    });
  }

  // Header Shrink on Scroll
  setupHeaderShrink() {
    if (!this.header) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            this.header.classList.add('header--shrink');
          } else {
            this.header.classList.remove('header--shrink');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// Initialize when DOM is ready
function initHeaderAnimations() {
  const header = document.querySelector('header.header--modern');
  if (header) {
    // Force animation to start
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    // Trigger animation after a small delay
    requestAnimationFrame(() => {
      header.classList.add('header-animate');
      setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
      }, 100);
    });
  }
  
  // Force icons to be visible and trigger animation
  const icons = document.querySelectorAll('.header__icon, .header__hamburger');
  icons.forEach(icon => {
    // Ensure initial state
    icon.style.opacity = '0';
    icon.style.transform = 'translateX(100px)';
    icon.style.visibility = 'visible';
    // Force animation to restart
    icon.style.animation = 'none';
    setTimeout(() => {
      icon.style.animation = '';
    }, 10);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ModernHeader();
    initHeaderAnimations();
  });
} else {
  new ModernHeader();
  initHeaderAnimations();
}

// Re-initialize on dynamic content load (for theme editor)
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    new ModernHeader();
  });
}

