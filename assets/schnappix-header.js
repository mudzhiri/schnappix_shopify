/**
 * SCHNAPPIX Header JavaScript
 * Handles hamburger menu, search overlay, and cart count
 */

class SchnappixHeader {
  constructor() {
    this.header = document.querySelector('.schnappix-header');
    if (!this.header) return;

    this.init();
  }

  init() {
    this.setupHamburger();
    this.setupSearch();
    this.setupSticky();
    this.updateCartCount();
    this.setupDrawerClose();
  }

  setupHamburger() {
    const hamburger = this.header.querySelector('[data-hamburger-toggle]');
    const drawer = this.header.querySelector('[data-menu-drawer]');
    const overlay = this.header.querySelector('[data-drawer-overlay]');
    const closeBtn = this.header.querySelector('[data-drawer-close]');

    if (!hamburger || !drawer) return;

    const toggleDrawer = () => {
      const isOpen = drawer.dataset.open === 'true';
      drawer.dataset.open = !isOpen;
      hamburger.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleDrawer);
    if (overlay) overlay.addEventListener('click', toggleDrawer);
    if (closeBtn) closeBtn.addEventListener('click', toggleDrawer);

    // Close drawer on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.dataset.open === 'true') {
        toggleDrawer();
      }
    });
  }

  setupSearch() {
    const searchToggle = this.header.querySelector('[data-search-toggle]');
    const searchOverlay = this.header.querySelector('[data-search-overlay]');
    const searchClose = this.header.querySelector('[data-search-close]');
    const searchOverlayClose = this.header.querySelector('[data-search-overlay-close]');

    if (!searchToggle || !searchOverlay) return;

    const toggleSearch = () => {
      const isOpen = searchOverlay.dataset.open === 'true';
      searchOverlay.dataset.open = !isOpen;
      document.body.style.overflow = !isOpen ? 'hidden' : '';
      
      if (!isOpen) {
        const input = searchOverlay.querySelector('input[type="search"]');
        if (input) setTimeout(() => input.focus(), 100);
      }
    };

    searchToggle.addEventListener('click', toggleSearch);
    if (searchClose) searchClose.addEventListener('click', toggleSearch);
    if (searchOverlayClose) searchOverlayClose.addEventListener('click', toggleSearch);

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.dataset.open === 'true') {
        toggleSearch();
      }
    });
  }

  setupSticky() {
    const stickyEnabled = this.header.dataset.sticky !== 'false';
    if (!stickyEnabled) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > scrollThreshold) {
        this.header.dataset.sticky = 'true';
        this.header.classList.add('is-scrolled');
      } else {
        this.header.dataset.sticky = 'false';
        this.header.classList.remove('is-scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  updateCartCount() {
    const cartCountBadge = this.header.querySelector('[data-cart-count-badge]');
    if (!cartCountBadge) return;

    // Fetch cart count from Shopify
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const count = cart.item_count || 0;
        cartCountBadge.textContent = count;
        cartCountBadge.style.display = count > 0 ? 'block' : 'none';
      })
      .catch(() => {
        // Silently fail if cart is not available
      });
  }

  setupDrawerClose() {
    const drawerLinks = this.header.querySelectorAll('.schnappix-header__drawer-link');
    const drawer = this.header.querySelector('[data-menu-drawer]');
    const hamburger = this.header.querySelector('[data-hamburger-toggle]');

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close drawer when a link is clicked (optional - remove if you want drawer to stay open)
        if (drawer && drawer.dataset.open === 'true') {
          drawer.dataset.open = 'false';
          if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SchnappixHeader();
  });
} else {
  new SchnappixHeader();
}

// Re-initialize on theme editor changes
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    new SchnappixHeader();
  });
}

