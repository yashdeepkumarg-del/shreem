import { Injectable, computed, signal } from '@angular/core';
import {
  Category,
  Product,
  Seller,
  Order,
  CartItem,
  FilterOptions,
  PageView,
  Address,
  ArtisanCluster
} from '../models/marketplace.model';
import { CATEGORIES, PRODUCTS, SELLERS, MOCK_ORDERS, DEFAULT_SAVED_ADDRESS, ARTISAN_CLUSTERS } from '../data/mock-data';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  // Accessibility & Localization
  readonly currentLanguage = signal<'en' | 'hi'>('en');
  readonly fontScale = signal<'normal' | 'large' | 'larger'>('normal');
  readonly highContrast = signal<boolean>(false);

  // Navigation
  readonly currentView = signal<PageView>('home');

  // Catalogs
  readonly categories = signal<Category[]>(CATEGORIES);
  readonly allProducts = signal<Product[]>(PRODUCTS);
  readonly allSellers = signal<Seller[]>(SELLERS);
  readonly allClusters = signal<ArtisanCluster[]>(ARTISAN_CLUSTERS);
  readonly selectedCluster = signal<ArtisanCluster | null>(ARTISAN_CLUSTERS[0]);

  // Filter & Search
  readonly searchQuery = signal<string>('');
  readonly filters = signal<FilterOptions>({
    category: 'all',
    minPrice: 0,
    maxPrice: 10000,
    state: 'all',
    onlyGI: false,
    onlySHG: false,
    onlyInStock: false,
    minRating: 0,
    sortBy: 'featured',
    searchQuery: ''
  });

  // Selected entities for modals
  readonly selectedProduct = signal<Product | null>(null);
  readonly previewProduct = signal<Product | null>(null);
  readonly selectedSeller = signal<Seller | null>(null);
  readonly selectedOrder = signal<Order | null>(null);

  // Modals & Drawers visibility
  readonly isCartDrawerOpen = signal<boolean>(false);
  readonly isCheckoutModalOpen = signal<boolean>(false);
  readonly isAccountModalOpen = signal<boolean>(false);
  readonly isFilterDrawerOpen = signal<boolean>(false);
  readonly isSearchOverlayOpen = signal<boolean>(false);
  readonly isSupportModalOpen = signal<boolean>(false);
  readonly activeSupportTab = signal<'track' | 'returns' | 'cancellation' | 'faqs' | 'contact'>('faqs');

  // Shopping Cart & Saved data
  readonly cartItems = signal<CartItem[]>([]);
  readonly wishlistIds = signal<string[]>(['prod-001']);
  readonly couponCode = signal<string>('');
  readonly couponDiscount = signal<number>(0);
  readonly orders = signal<Order[]>(MOCK_ORDERS);
  readonly savedAddress = signal<Address>(DEFAULT_SAVED_ADDRESS);
  readonly savedAddresses = signal<Address[]>([
    DEFAULT_SAVED_ADDRESS,
    {
      id: 'addr-work',
      fullName: 'Yashdeep Kumar',
      phone: '+91 98765 43210',
      pincode: '560038',
      addressLine: 'Desk 4B, National Informatics Center, 3rd Floor, Tech Enclave',
      landmark: 'Opposite Metro Station',
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      state: 'Karnataka',
      isDefault: false,
      type: 'Work'
    }
  ]);

  // Citizen Profile State
  readonly userProfile = signal({
    name: 'Yashdeep Kumar',
    email: 'yashdeepkumarg@gmail.com',
    phone: '+91 98765 43210',
    state: 'Delhi',
    city: 'New Delhi',
    pincode: '110001',
    aadhaarVerified: true,
    memberSince: 'November 2024'
  });

  // Dedicated Account Page Active Section
  readonly activeAccountTab = signal<'orders' | 'profile' | 'addresses' | 'payments' | 'impact' | 'grievance'>('orders');

  // Toast notifications
  readonly toasts = signal<ToastMessage[]>([]);

  // Computed Values
  readonly cartCount = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  readonly cartSubtotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  readonly cartMrpTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.product.originalPrice * item.quantity), 0);
  });

  readonly cartSavings = computed(() => {
    return Math.max(0, this.cartMrpTotal() - this.cartSubtotal() + this.couponDiscount());
  });

  readonly deliveryFee = computed(() => {
    if (this.cartSubtotal() === 0) return 0;
    return this.cartSubtotal() >= 499 ? 0 : 70;
  });

  readonly shgContribution = computed(() => {
    // 1% of order value directly pledged by platform to Rural SHG Corpus
    return this.cartSubtotal() > 0 ? Math.round(this.cartSubtotal() * 0.015) : 0;
  });

  readonly cartGrandTotal = computed(() => {
    const total = this.cartSubtotal() + this.deliveryFee() - this.couponDiscount();
    return Math.max(0, total);
  });

  // Filtered Products
  readonly filteredProducts = computed(() => {
    const list = this.allProducts();
    const f = this.filters();
    const query = this.searchQuery().trim().toLowerCase();

    return list.filter(p => {
      // Search matching
      if (query) {
        const matchesName = p.name.toLowerCase().includes(query) || (p.hindiName && p.hindiName.includes(query));
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesSeller = p.sellerName.toLowerCase().includes(query);
        const matchesState = p.state.toLowerCase().includes(query);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesSeller && !matchesState && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (f.category !== 'all' && p.categorySlug !== f.category) {
        return false;
      }

      // Price filter
      if (p.price < f.minPrice || p.price > f.maxPrice) {
        return false;
      }

      // State filter
      if (f.state !== 'all' && p.state !== f.state) {
        return false;
      }

      // GI Tag filter
      if (f.onlyGI && !p.isGI) {
        return false;
      }

      // SHG filter
      if (f.onlySHG && p.sellerType !== 'SHG') {
        return false;
      }

      // In Stock filter
      if (f.onlyInStock && !p.inStock) {
        return false;
      }

      // Rating filter
      if (f.minRating > 0 && p.rating < f.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (f.sortBy === 'price-asc') return a.price - b.price;
      if (f.sortBy === 'price-desc') return b.price - a.price;
      if (f.sortBy === 'rating') return b.rating - a.rating;
      if (f.sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // featured default
    });
  });

  readonly featuredProducts = computed(() => {
    return this.allProducts().slice(0, 4);
  });

  readonly bestsellers = computed(() => {
    return this.allProducts().slice(2, 6);
  });

  readonly uniqueStates = computed(() => {
    const states = new Set(this.allProducts().map(p => p.state));
    return Array.from(states).sort();
  });

  // Actions
  toggleLanguage() {
    this.currentLanguage.update(l => l === 'en' ? 'hi' : 'en');
  }

  setFontScale(scale: 'normal' | 'large' | 'larger') {
    this.fontScale.set(scale);
  }

  toggleHighContrast() {
    this.highContrast.update(v => !v);
  }

  setView(view: PageView) {
    this.currentView.set(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectCategory(categorySlug: string) {
    this.filters.update(f => ({ ...f, category: categorySlug }));
    this.setView('catalogue');
  }

  setSearchQuery(q: string) {
    this.searchQuery.set(q);
  }

  updateFilter<K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) {
    this.filters.update(f => ({ ...f, [key]: value }));
  }

  resetFilters() {
    this.filters.set({
      category: 'all',
      minPrice: 0,
      maxPrice: 10000,
      state: 'all',
      onlyGI: false,
      onlySHG: false,
      onlyInStock: false,
      minRating: 0,
      sortBy: 'featured',
      searchQuery: ''
    });
    this.searchQuery.set('');
  }

  // Cart operations
  addToCart(product: Product, quantity = 1) {
    this.cartItems.update(items => {
      const existingIndex = items.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...items, { product, quantity }];
      }
    });

    this.showToast(`Added "${product.name.slice(0, 32)}..." to your shopping bag`, 'success');
  }

  updateCartQuantity(productId: string, delta: number) {
    this.cartItems.update(items => {
      return items.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
    this.showToast('Item removed from cart', 'info');
  }

  applyCoupon(code: string): { success: boolean; message: string } {
    const clean = code.trim().toUpperCase();
    if (clean === 'VOCALFORLOCAL') {
      const discount = Math.round(this.cartSubtotal() * 0.10);
      this.couponCode.set(clean);
      this.couponDiscount.set(discount);
      this.showToast(`Coupon VOCALFORLOCAL applied! Saved ₹${discount}`, 'success');
      return { success: true, message: `Coupon applied: ₹${discount} discount` };
    } else if (clean === 'SHGPRIDE') {
      const discount = 150;
      this.couponCode.set(clean);
      this.couponDiscount.set(discount);
      this.showToast(`Coupon SHGPRIDE applied! Flat ₹150 off`, 'success');
      return { success: true, message: `Coupon applied: ₹150 off` };
    } else {
      this.showToast('Invalid coupon code. Try "VOCALFORLOCAL"', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
  }

  removeCoupon() {
    this.couponCode.set('');
    this.couponDiscount.set(0);
    this.showToast('Coupon removed', 'info');
  }

  // Wishlist
  toggleWishlist(productId: string) {
    this.wishlistIds.update(ids => {
      if (ids.includes(productId)) {
        this.showToast('Removed from your wishlist', 'info');
        return ids.filter(id => id !== productId);
      } else {
        this.showToast('Saved to your wishlist', 'success');
        return [...ids, productId];
      }
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds().includes(productId);
  }

  readonly previousView = signal<PageView>('catalogue');

  // Product detail full-page navigation
  openProductDetail(product: Product) {
    this.closeProductPreview();
    if (this.currentView() !== 'product-detail') {
      this.previousView.set(this.currentView());
    }
    this.selectedProduct.set(product);
    this.setView('product-detail');
  }

  openProductPreview(product: Product) {
    this.previewProduct.set(product);
  }

  closeProductPreview() {
    this.previewProduct.set(null);
  }

  backFromProductDetail() {
    const prev = this.previousView();
    this.setView(prev === 'product-detail' ? 'catalogue' : prev);
  }

  closeProductDetail() {
    this.backFromProductDetail();
  }

  openSellerProfile(seller: Seller) {
    this.selectedSeller.set(seller);
  }

  closeSellerProfile() {
    this.selectedSeller.set(null);
  }

  openAccount(tab: 'orders' | 'profile' | 'addresses' | 'payments' | 'impact' | 'grievance' = 'orders') {
    this.activeAccountTab.set(tab);
    this.isAccountModalOpen.set(false);
    this.setView('account');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openOrderTracking(order: Order) {
    this.selectedOrder.set(order);
    this.openAccount('orders');
  }

  toggleCartDrawer(open?: boolean) {
    this.isCartDrawerOpen.update(v => open !== undefined ? open : !v);
  }

  toggleCheckoutModal(open?: boolean) {
    this.isCheckoutModalOpen.update(v => open !== undefined ? open : !v);
  }

  toggleAccountModal(open?: boolean) {
    if (open !== false) {
      this.openAccount('orders');
    } else {
      this.isAccountModalOpen.set(false);
    }
  }

  toggleFilterDrawer(open?: boolean) {
    this.isFilterDrawerOpen.update(v => open !== undefined ? open : !v);
  }

  openSupport(tab: 'track' | 'returns' | 'cancellation' | 'faqs' | 'contact' = 'faqs') {
    this.activeSupportTab.set(tab);
    this.isSupportModalOpen.set(true);
  }

  closeSupport() {
    this.isSupportModalOpen.set(false);
  }

  toggleSupportModal(open?: boolean) {
    this.isSupportModalOpen.update(v => open !== undefined ? open : !v);
  }

  // Place Order
  placeOrder(address: Address, paymentMethod: string): Order {
    const newOrderId = `IN-SHG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: 'Today, ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: [...this.cartItems()],
      subtotal: this.cartSubtotal(),
      deliveryFee: this.deliveryFee(),
      shgSupportDonation: this.shgContribution(),
      discount: this.couponDiscount(),
      total: this.cartGrandTotal(),
      paymentMethod,
      status: 'Confirmed',
      deliveryEstimate: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      address,
      trackingSteps: [
        {
          title: 'Order Confirmed & Escrow Initiated',
          location: 'Government Direct Benefit Platform, New Delhi',
          date: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Direct Intimation to Rural Producer Hub',
          location: 'Assigned Cluster Centre',
          date: 'Pending dispatch',
          completed: false
        },
        {
          title: 'Dispatched via India Post Speed Post',
          location: 'State Logistics Depot',
          date: 'Scheduled',
          completed: false
        },
        {
          title: 'Delivered to Doorstep',
          location: address.city + ', ' + address.pincode,
          date: 'Estimated in 3-5 days',
          completed: false
        }
      ]
    };

    this.orders.update(all => [newOrder, ...all]);
    this.cartItems.set([]);
    this.couponCode.set('');
    this.couponDiscount.set(0);
    this.selectedOrder.set(newOrder);
    this.showToast(`Order #${newOrderId} placed successfully!`, 'success');
    return newOrder;
  }

  // Toast
  showToast(message: string, type: 'success' | 'info' | 'error' = 'info') {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.update(t => [...t, { id, message, type }]);
    setTimeout(() => {
      this.toasts.update(t => t.filter(item => item.id !== id));
    }, 3800);
  }

  dismissToast(id: string) {
    this.toasts.update(t => t.filter(item => item.id !== id));
  }
}
