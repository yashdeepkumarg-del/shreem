import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  inject,
  signal
} from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

interface MegaMenuLink {
  label: string;
  action: () => void;
}

interface MegaMenuColumn {
  id: string;
  icon: string;
  title: string;
  vignetteImage: string;
  links: MegaMenuLink[];
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="sticky top-0 z-40 border-b border-white/60 bg-white/75 shadow-[0_8px_30px_-15px_rgba(20,25,70,0.08)] backdrop-blur-xl">
      <div class="relative">
        
        <!-- Header Top Bar -->
        <div class="mx-auto flex h-[76px] w-full max-w-[1720px] items-center justify-between px-3 sm:h-[90px] sm:px-6 lg:px-8">
          
          <!-- 1. Left Logo Container (balanced width to center the nav) -->
          <div class="flex shrink-0 items-center lg:w-[210px]">
            <button 
              type="button"
              (click)="market.setView('home'); closeMegaMenu()"
              class="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-[#0D5C3A]"
              aria-label="Shreem Homepage">
              
              <img
                src="/assets/hero/shreem-logo.png"
                alt="Shreem logo"
                class="h-[68px] w-[68px] shrink-0 rounded-full object-contain transition-transform group-hover:scale-105 sm:h-20 sm:w-20"
              />
            </button>
          </div>

          <!-- 2. Centered Frosted Glass Navigation Pill (Visible on lg: 1024px and up) -->
          <nav
            aria-label="Main navigation"
            class="relative z-50 hidden flex-1 justify-center lg:flex"
            (mouseleave)="onNavLeave()">
            <div class="inline-flex h-[48px] max-w-full items-center gap-0.5 rounded-full border border-white/85 bg-white/70 p-1 shadow-[0_8px_32px_rgba(15,35,30,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.95)] backdrop-blur-2xl backdrop-saturate-150 xl:gap-1">
              
              <!-- 1. Home -->
              <button
                type="button"
                (click)="market.setView('home'); closeMegaMenu()"
                [class.bg-white]="market.currentView() === 'home' && !isMegaMenuOpen()"
                [class.text-[#0d5c3a]]="market.currentView() === 'home' && !isMegaMenuOpen()"
                [class.shadow-xs]="market.currentView() === 'home' && !isMegaMenuOpen()"
                [class.text-[#1b3858]]="market.currentView() !== 'home' || isMegaMenuOpen()"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-3 xl:text-xs cursor-pointer"
                [attr.aria-current]="market.currentView() === 'home' ? 'page' : null">
                <mat-icon class="!h-3.5 !w-3.5 !text-[14px]">home</mat-icon>
                <span>Home</span>
              </button>

              <!-- 2. Categories Dropdown Trigger -->
              <button
                type="button"
                (mouseenter)="onNavHover('category')"
                (click)="onNavClick('category')"
                [class.bg-white]="isMegaMenuOpen() && activeColumn() === 'category'"
                [class.text-[#0d5c3a]]="isMegaMenuOpen() && activeColumn() === 'category'"
                [class.shadow-xs]="isMegaMenuOpen() && activeColumn() === 'category'"
                [class.text-[#1b3858]]="!isMegaMenuOpen() || activeColumn() !== 'category'"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-2.5 xl:text-xs cursor-pointer">
                <span>Categories</span>
                <mat-icon class="!h-3 !w-3 !text-[13px] text-[#556982] transition-transform duration-200" [class.rotate-180]="isMegaMenuOpen() && activeColumn() === 'category'">keyboard_arrow_down</mat-icon>
              </button>

              <!-- 3. Collections Dropdown Trigger -->
              <button
                type="button"
                (mouseenter)="onNavHover('collections')"
                (click)="onNavClick('collections')"
                [class.bg-white]="isMegaMenuOpen() && activeColumn() === 'collections'"
                [class.text-[#0d5c3a]]="isMegaMenuOpen() && activeColumn() === 'collections'"
                [class.shadow-xs]="isMegaMenuOpen() && activeColumn() === 'collections'"
                [class.text-[#1b3858]]="!isMegaMenuOpen() || activeColumn() !== 'collections'"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-2.5 xl:text-xs cursor-pointer">
                <span>Collections</span>
                <mat-icon class="!h-3 !w-3 !text-[13px] text-[#556982] transition-transform duration-200" [class.rotate-180]="isMegaMenuOpen() && activeColumn() === 'collections'">keyboard_arrow_down</mat-icon>
              </button>

              <!-- 4. Artisans Dropdown Trigger -->
              <button
                type="button"
                (mouseenter)="onNavHover('artisans')"
                (click)="onNavClick('artisans')"
                [class.bg-white]="isMegaMenuOpen() && activeColumn() === 'artisans'"
                [class.text-[#0d5c3a]]="isMegaMenuOpen() && activeColumn() === 'artisans'"
                [class.shadow-xs]="isMegaMenuOpen() && activeColumn() === 'artisans'"
                [class.text-[#1b3858]]="!isMegaMenuOpen() || activeColumn() !== 'artisans'"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-2.5 xl:text-xs cursor-pointer">
                <span>Artisans &amp; Brands</span>
                <mat-icon class="!h-3 !w-3 !text-[13px] text-[#556982] transition-transform duration-200" [class.rotate-180]="isMegaMenuOpen() && activeColumn() === 'artisans'">keyboard_arrow_down</mat-icon>
              </button>

              <!-- 5. Interactive Craft Atlas -->
              <button
                type="button"
                (click)="market.setView('craft-map'); closeMegaMenu()"
                [class.bg-white]="market.currentView() === 'craft-map' && !isMegaMenuOpen()"
                [class.text-[#0d5c3a]]="market.currentView() === 'craft-map' && !isMegaMenuOpen()"
                [class.shadow-xs]="market.currentView() === 'craft-map' && !isMegaMenuOpen()"
                [class.text-[#1b3858]]="market.currentView() !== 'craft-map' || isMegaMenuOpen()"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-2.5 xl:text-xs cursor-pointer">
                <span>Craft Atlas</span>
              </button>

              <!-- 6. About Us -->
              <button
                type="button"
                (click)="market.setView('about'); closeMegaMenu()"
                [class.bg-white]="market.currentView() === 'about' && !isMegaMenuOpen()"
                [class.text-[#0d5c3a]]="market.currentView() === 'about' && !isMegaMenuOpen()"
                [class.shadow-xs]="market.currentView() === 'about' && !isMegaMenuOpen()"
                [class.text-[#1b3858]]="market.currentView() !== 'about' || isMegaMenuOpen()"
                class="flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-2 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-2.5 xl:text-xs cursor-pointer">
                <span>About Us</span>
              </button>

              <!-- 7. Help & Support Dropdown Trigger -->
              <button
                type="button"
                (mouseenter)="onNavHover('support')"
                (click)="onNavClick('support')"
                [class.bg-white]="isMegaMenuOpen() && activeColumn() === 'support'"
                [class.text-[#0d5c3a]]="isMegaMenuOpen() && activeColumn() === 'support'"
                [class.shadow-xs]="isMegaMenuOpen() && activeColumn() === 'support'"
                [class.text-[#1b3858]]="!isMegaMenuOpen() || activeColumn() !== 'support'"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 text-[11px] font-extrabold uppercase tracking-wide transition hover:bg-white/80 xl:px-2.5 xl:text-xs cursor-pointer">
                <span>Help &amp; Support</span>
                <mat-icon class="!h-3 !w-3 !text-[13px] text-[#556982] transition-transform duration-200" [class.rotate-180]="isMegaMenuOpen() && activeColumn() === 'support'">keyboard_arrow_down</mat-icon>
              </button>

              <!-- 8. Explore All Mega Menu Button (Snug, polished emerald pill, zero overflow) -->
              <button
                type="button"
                (mouseenter)="onNavHover('all')"
                (click)="onNavClick('all')"
                class="flex h-9 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-gradient-to-r from-[#0D5C3A] to-[#084229] px-3 text-[11px] font-black uppercase tracking-wide text-white shadow-[0_3px_10px_rgba(13,92,58,0.3)] transition hover:brightness-110 active:scale-95 cursor-pointer xl:px-3.5 xl:text-xs">
                <mat-icon class="!h-3.5 !w-3.5 !text-[15px]">widgets</mat-icon>
                <span>Explore All</span>
                <mat-icon class="!h-3 !w-3 !text-[13px] transition-transform duration-200" [class.rotate-180]="isMegaMenuOpen()">keyboard_arrow_down</mat-icon>
              </button>

            </div>
          </nav>

          <!-- 3. Right Action Controls (balanced width) -->
          <div class="flex shrink-0 items-center justify-end gap-1 min-[360px]:gap-1.5 sm:gap-2 lg:w-[210px]">
            <!-- Search -->
            <button
              type="button"
              (click)="isSearchOpen.update(open => !open); showSuggestions.set(false); closeMegaMenu()"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-[#19134f] text-white shadow-sm transition hover:bg-[#29216f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2776c8] min-[360px]:h-9 min-[360px]:w-9 sm:h-11 sm:w-11 cursor-pointer"
              aria-label="Search products"
              [attr.aria-expanded]="isSearchOpen()">
              <mat-icon class="!h-4 !w-4 !text-[17px] sm:!h-5 sm:!w-5 sm:!text-[20px]">search</mat-icon>
            </button>
            
            <!-- Citizen Account -->
            <button
              type="button"
              (click)="market.openAccount('orders'); closeMegaMenu()"
              class="hidden h-9 w-9 items-center justify-center rounded-full bg-[#19134f] text-white shadow-sm transition hover:bg-[#29216f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2776c8] sm:h-11 sm:w-11 sm:flex cursor-pointer"
              aria-label="My account"
              title="My Account">
              <mat-icon class="!h-4 !w-4 !text-[17px] sm:!h-5 sm:!w-5 sm:!text-[20px]">person_outline</mat-icon>
            </button>
            
            <!-- Wishlist -->
            <button
              type="button"
              (click)="market.setView('wishlist'); closeMegaMenu()"
              class="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#19134f] text-white shadow-sm transition hover:bg-[#29216f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2776c8] min-[360px]:h-9 min-[360px]:w-9 sm:h-11 sm:w-11 cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist">
              <mat-icon class="!h-4 !w-4 !text-[17px] sm:!h-5 sm:!w-5 sm:!text-[20px]">favorite_border</mat-icon>
              @if (market.wishlistIds().length > 0) {
                <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ee8b22] px-1 text-[9px] font-bold text-white">{{ market.wishlistIds().length }}</span>
              }
            </button>
            
            <!-- Cart Drawer Trigger -->
            <button
              type="button"
              (click)="market.toggleCartDrawer(true); closeMegaMenu()"
              class="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#19134f] text-white shadow-sm transition hover:bg-[#29216f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2776c8] min-[360px]:h-9 min-[360px]:w-9 sm:h-11 sm:w-11 cursor-pointer"
              aria-label="Shopping cart"
              title="Shopping Cart">
              <mat-icon class="!h-4 !w-4 !text-[17px] sm:!h-5 sm:!w-5 sm:!text-[20px]">shopping_cart</mat-icon>
              @if (market.cartCount() > 0) {
                <span class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ee8b22] px-1 text-[9px] font-bold text-white">{{ market.cartCount() }}</span>
              }
            </button>
            
            <!-- Menu Toggle Button (Visible on screens < lg) -->
            <button
              type="button"
              (click)="isMobileMenuOpen.update(open => !open); closeMegaMenu()"
              class="flex h-8 w-8 items-center justify-center rounded-full border border-[#e4e9f2] text-[#19134f] transition hover:bg-[#f1f5fb] min-[360px]:h-9 min-[360px]:w-9 lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
              [attr.aria-expanded]="isMobileMenuOpen()">
              <mat-icon class="!h-5 !w-5 !text-[20px]">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- MEGA MENU DROPDOWN PANEL (5 COLUMNS + 1 PROMO CARD)      -->
        <!-- ======================================================== -->
        @if (isMegaMenuOpen()) {
          <!-- Full-screen backdrop overlay for focus -->
          <div 
            class="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            (click)="closeMegaMenu()">
          </div>

          <!-- Dropdown Container Card -->
          <div 
            class="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-[96vw] max-w-[1360px] overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_24px_50px_-12px_rgba(15,23,42,0.25)] animate-in fade-in slide-in-from-top-3 duration-200"
            (mouseenter)="cancelCloseTimer()"
            (mouseleave)="onNavLeave()"
            (click)="$event.stopPropagation()">
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:divide-x divide-[#edf2f7]">
              
              <!-- COLUMN 1: Shop by Category -->
              <div 
                class="flex flex-col justify-between p-5 lg:p-6 transition-all"
                [class.bg-[#f4f9f6]]="activeColumn() === 'category'">
                <div>
                  <div class="flex items-center gap-2">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3ee] text-[#0d5c3a] shadow-2xs">
                      <mat-icon class="!h-5 !w-5 !text-[20px]">grid_view</mat-icon>
                    </div>
                  </div>
                  <h3 class="mt-3 text-[17px] font-black tracking-tight text-[#0f3028]">
                    Shop by Category
                  </h3>
                  <div class="mt-1.5 mb-3.5 h-[3px] w-10 rounded-full bg-[#e09825]"></div>

                  <ul class="space-y-1.5">
                    @for (link of categoryColumn.links; track link.label) {
                      <li>
                        <button
                          type="button"
                          (click)="link.action(); closeMegaMenu()"
                          class="group flex w-full items-center gap-1.5 text-left text-[13px] font-semibold text-[#344054] transition hover:translate-x-0.5 hover:text-[#0d5c3a] cursor-pointer py-0.5">
                          <mat-icon class="!h-3.5 !w-3.5 !text-[15px] text-slate-400 group-hover:text-[#0d5c3a] transition-colors shrink-0">chevron_right</mat-icon>
                          <span>{{ link.label }}</span>
                        </button>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Bottom Vignette -->
                <div class="mt-4 pt-2 border-t border-slate-100/80">
                  <img
                    [src]="categoryColumn.vignetteImage"
                    alt="Artisan painting a decorated pottery vase"
                    class="h-[105px] w-full object-contain object-bottom mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <!-- COLUMN 2: Collections -->
              <div 
                class="flex flex-col justify-between p-5 lg:p-6 transition-all"
                [class.bg-[#f4f9f6]]="activeColumn() === 'collections'">
                <div>
                  <div class="flex items-center gap-2">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3ee] text-[#0d5c3a] shadow-2xs">
                      <mat-icon class="!h-5 !w-5 !text-[20px]">local_offer</mat-icon>
                    </div>
                  </div>
                  <h3 class="mt-3 text-[17px] font-black tracking-tight text-[#0f3028]">
                    Collections
                  </h3>
                  <div class="mt-1.5 mb-3.5 h-[3px] w-10 rounded-full bg-[#e09825]"></div>

                  <ul class="space-y-1.5">
                    @for (link of collectionsColumn.links; track link.label) {
                      <li>
                        <button
                          type="button"
                          (click)="link.action(); closeMegaMenu()"
                          class="group flex w-full items-center gap-1.5 text-left text-[13px] font-semibold text-[#344054] transition hover:translate-x-0.5 hover:text-[#0d5c3a] cursor-pointer py-0.5">
                          <mat-icon class="!h-3.5 !w-3.5 !text-[15px] text-slate-400 group-hover:text-[#0d5c3a] transition-colors shrink-0">chevron_right</mat-icon>
                          <span>{{ link.label }}</span>
                        </button>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Bottom Vignette -->
                <div class="mt-4 pt-2 border-t border-slate-100/80">
                  <img
                    [src]="collectionsColumn.vignetteImage"
                    alt="Artisan weaving colorful fabric on a handloom"
                    class="h-[105px] w-full object-contain object-bottom mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <!-- COLUMN 3: Artisan & Brands -->
              <div 
                class="flex flex-col justify-between p-5 lg:p-6 transition-all"
                [class.bg-[#f4f9f6]]="activeColumn() === 'artisans'">
                <div>
                  <div class="flex items-center gap-2">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3ee] text-[#0d5c3a] shadow-2xs">
                      <mat-icon class="!h-5 !w-5 !text-[20px]">workspace_premium</mat-icon>
                    </div>
                  </div>
                  <h3 class="mt-3 text-[17px] font-black tracking-tight text-[#0f3028]">
                    Artisan & Brands
                  </h3>
                  <div class="mt-1.5 mb-3.5 h-[3px] w-10 rounded-full bg-[#e09825]"></div>

                  <ul class="space-y-1.5">
                    @for (link of artisansColumn.links; track link.label) {
                      <li>
                        <button
                          type="button"
                          (click)="link.action(); closeMegaMenu()"
                          class="group flex w-full items-center gap-1.5 text-left text-[13px] font-semibold text-[#344054] transition hover:translate-x-0.5 hover:text-[#0d5c3a] cursor-pointer py-0.5">
                          <mat-icon class="!h-3.5 !w-3.5 !text-[15px] text-slate-400 group-hover:text-[#0d5c3a] transition-colors shrink-0">chevron_right</mat-icon>
                          <span>{{ link.label }}</span>
                        </button>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Bottom Vignette -->
                <div class="mt-4 pt-2 border-t border-slate-100/80">
                  <img
                    [src]="artisansColumn.vignetteImage"
                    alt="Artisan making gold jewelry by hand"
                    class="h-[105px] w-full object-contain object-bottom mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <!-- COLUMN 4: Help & Support -->
              <div 
                class="flex flex-col justify-between p-5 lg:p-6 transition-all"
                [class.bg-[#f4f9f6]]="activeColumn() === 'support'">
                <div>
                  <div class="flex items-center gap-2">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3ee] text-[#0d5c3a] shadow-2xs">
                      <mat-icon class="!h-5 !w-5 !text-[20px]">headset_mic</mat-icon>
                    </div>
                  </div>
                  <h3 class="mt-3 text-[17px] font-black tracking-tight text-[#0f3028]">
                    Help & Support
                  </h3>
                  <div class="mt-1.5 mb-3.5 h-[3px] w-10 rounded-full bg-[#e09825]"></div>

                  <ul class="space-y-1.5">
                    @for (link of supportColumn.links; track link.label) {
                      <li>
                        <button
                          type="button"
                          (click)="link.action(); closeMegaMenu()"
                          class="group flex w-full items-center gap-1.5 text-left text-[13px] font-semibold text-[#344054] transition hover:translate-x-0.5 hover:text-[#0d5c3a] cursor-pointer py-0.5">
                          <mat-icon class="!h-3.5 !w-3.5 !text-[15px] text-slate-400 group-hover:text-[#0d5c3a] transition-colors shrink-0">chevron_right</mat-icon>
                          <span>{{ link.label }}</span>
                        </button>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Bottom Vignette -->
                <div class="mt-4 pt-2 border-t border-slate-100/80">
                  <img
                    [src]="supportColumn.vignetteImage"
                    alt="Artisan arranging a handcrafted gift hamper"
                    class="h-[105px] w-full object-contain object-bottom mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <!-- COLUMN 5: My Account -->
              <div 
                class="flex flex-col justify-between p-5 lg:p-6 transition-all"
                [class.bg-[#f4f9f6]]="activeColumn() === 'account'">
                <div>
                  <div class="flex items-center gap-2">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3ee] text-[#0d5c3a] shadow-2xs">
                      <mat-icon class="!h-5 !w-5 !text-[20px]">person_outline</mat-icon>
                    </div>
                  </div>
                  <h3 class="mt-3 text-[17px] font-black tracking-tight text-[#0f3028]">
                    My Account
                  </h3>
                  <div class="mt-1.5 mb-3.5 h-[3px] w-10 rounded-full bg-[#e09825]"></div>

                  <ul class="space-y-1.5">
                    @for (link of accountColumn.links; track link.label) {
                      <li>
                        <button
                          type="button"
                          (click)="link.action(); closeMegaMenu()"
                          class="group flex w-full items-center gap-1.5 text-left text-[13px] font-semibold text-[#344054] transition hover:translate-x-0.5 hover:text-[#0d5c3a] cursor-pointer py-0.5">
                          <mat-icon class="!h-3.5 !w-3.5 !text-[15px] text-slate-400 group-hover:text-[#0d5c3a] transition-colors shrink-0">chevron_right</mat-icon>
                          <span>{{ link.label }}</span>
                        </button>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Bottom Vignette -->
                <div class="mt-4 pt-2 border-t border-slate-100/80">
                  <img
                    [src]="accountColumn.vignetteImage"
                    alt="Artisan weaving a natural fiber basket"
                    class="h-[105px] w-full object-contain object-bottom mix-blend-multiply opacity-90 transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <!-- COLUMN 6: Featured Promo Banner Card -->
              <div class="p-4 sm:p-5 flex flex-col justify-center bg-[#fafbfc]">
                <div class="group relative overflow-hidden rounded-2xl border border-[#d2e4db] bg-gradient-to-br from-[#f2f7f4] via-[#e8f1ec] to-[#d6e7de] p-5 shadow-sm transition hover:shadow-md h-full flex flex-col justify-between min-h-[340px]">
                  
                  <!-- Banner Photo with Multiply Blend -->
                  <img
                    src="/assets/mega-menu/promo_artisan_banner.jpg"
                    alt="Indian artisan weaving"
                    class="absolute inset-0 h-full w-full object-cover object-center opacity-90 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-white/95 via-white/75 to-transparent"></div>

                  <!-- Badge -->
                  <div class="relative z-10">
                    <span class="inline-flex items-center gap-1 rounded-full border border-[#cfe2d7] bg-white/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#0d5c3a] shadow-2xs backdrop-blur-xs">
                      <mat-icon class="!h-3 !w-3 !text-[12px]">verified</mat-icon>
                      Direct From Artisans
                    </span>
                  </div>

                  <!-- Text & CTA Button -->
                  <div class="relative z-10 mt-auto pt-8">
                    <h4 class="font-serif text-xl sm:text-2xl font-black leading-tight text-[#0c392c]">
                      Discover<br/>India’s<br/>Handcrafted<br/>Treasures
                    </h4>
                    <p class="mt-1.5 text-[11px] font-semibold leading-relaxed text-[#2c4e43]">
                      Authentic • Sustainable •<br/>100% Direct Weaver Benefit
                    </p>

                    <button
                      type="button"
                      (click)="market.setView('catalogue'); closeMegaMenu()"
                      class="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0d5c3a] px-5 py-2.5 text-xs font-black text-white shadow-md transition-all hover:gap-3 hover:bg-[#07462c] cursor-pointer">
                      <span>Shop Now</span>
                      <mat-icon class="!h-4 !w-4 !text-[16px]">arrow_forward</mat-icon>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        }

        <!-- ======================================================== -->
        <!-- MOBILE NAVIGATION DRAWER (Screens < xl)                  -->
        <!-- ======================================================== -->
        @if (isMobileMenuOpen()) {
          <nav aria-label="Mobile navigation" class="border-t border-[#e9eaf1] bg-white px-4 py-4 shadow-xl xl:hidden max-h-[82vh] overflow-y-auto">
            <div class="space-y-4">
              
              <!-- Quick Main Views -->
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  (click)="navigate('home')"
                  [class.bg-[#0d5c3a]]="market.currentView() === 'home'"
                  [class.text-white]="market.currentView() === 'home'"
                  [class.text-[#173563]]="market.currentView() !== 'home'"
                  class="flex items-center gap-2 rounded-xl p-3 text-left text-xs font-bold uppercase tracking-wide border border-slate-200">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">home</mat-icon>
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  (click)="navigate('catalogue')"
                  [class.bg-[#0d5c3a]]="market.currentView() === 'catalogue'"
                  [class.text-white]="market.currentView() === 'catalogue'"
                  [class.text-[#173563]]="market.currentView() !== 'catalogue'"
                  class="flex items-center gap-2 rounded-xl p-3 text-left text-xs font-bold uppercase tracking-wide border border-slate-200">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">storefront</mat-icon>
                  <span>All Crafts</span>
                </button>

                <button
                  type="button"
                  (click)="navigate('craft-map')"
                  [class.bg-[#0d5c3a]]="market.currentView() === 'craft-map'"
                  [class.text-white]="market.currentView() === 'craft-map'"
                  [class.text-[#173563]]="market.currentView() !== 'craft-map'"
                  class="flex items-center gap-2 rounded-xl p-3 text-left text-xs font-bold uppercase tracking-wide border border-slate-200">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">map</mat-icon>
                  <span>Craft Atlas</span>
                </button>

                <button
                  type="button"
                  (click)="navigate('sellers')"
                  [class.bg-[#0d5c3a]]="market.currentView() === 'sellers'"
                  [class.text-white]="market.currentView() === 'sellers'"
                  [class.text-[#173563]]="market.currentView() !== 'sellers'"
                  class="flex items-center gap-2 rounded-xl p-3 text-left text-xs font-bold uppercase tracking-wide border border-slate-200">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">groups</mat-icon>
                  <span>Artisans</span>
                </button>
              </div>

              <!-- Shop by Category Accordion Section -->
              <div class="rounded-2xl border border-slate-200 p-3.5 bg-[#fbfcfb]">
                <div class="flex items-center gap-2 text-xs font-black text-[#0d5c3a] uppercase tracking-wider mb-2">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">grid_view</mat-icon>
                  <span>Shop by Category</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 text-xs font-semibold text-[#344054]">
                  @for (link of categoryColumn.links; track link.label) {
                    <button
                      type="button"
                      (click)="link.action(); isMobileMenuOpen.set(false)"
                      class="text-left py-1.5 px-2 rounded-lg hover:bg-[#e8f3ee] transition-colors cursor-pointer">
                      {{ link.label }}
                    </button>
                  }
                </div>
              </div>

              <!-- Collections Section -->
              <div class="rounded-2xl border border-slate-200 p-3.5 bg-[#fbfcfb]">
                <div class="flex items-center gap-2 text-xs font-black text-[#0d5c3a] uppercase tracking-wider mb-2">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">local_offer</mat-icon>
                  <span>Featured Collections</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 text-xs font-semibold text-[#344054]">
                  @for (link of collectionsColumn.links; track link.label) {
                    <button
                      type="button"
                      (click)="link.action(); isMobileMenuOpen.set(false)"
                      class="text-left py-1.5 px-2 rounded-lg hover:bg-[#e8f3ee] transition-colors cursor-pointer">
                      {{ link.label }}
                    </button>
                  }
                </div>
              </div>

              <!-- Help & Support Mobile -->
              <div class="rounded-2xl border border-slate-200 p-3.5 bg-[#fbfcfb]">
                <div class="flex items-center gap-2 text-xs font-black text-[#0d5c3a] uppercase tracking-wider mb-2">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">headset_mic</mat-icon>
                  <span>Help & Citizen Support</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 text-xs font-semibold text-[#344054]">
                  @for (link of supportColumn.links; track link.label) {
                    <button
                      type="button"
                      (click)="link.action(); isMobileMenuOpen.set(false)"
                      class="text-left py-1.5 px-2 rounded-lg hover:bg-[#e8f3ee] transition-colors cursor-pointer">
                      {{ link.label }}
                    </button>
                  }
                </div>
              </div>

              <!-- My Account Section -->
              <div class="rounded-2xl border border-slate-200 p-3.5 bg-[#fbfcfb]">
                <div class="flex items-center gap-2 text-xs font-black text-[#0d5c3a] uppercase tracking-wider mb-2">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">person_outline</mat-icon>
                  <span>Citizen Portal</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 text-xs font-semibold text-[#344054]">
                  @for (link of accountColumn.links; track link.label) {
                    <button
                      type="button"
                      (click)="link.action(); isMobileMenuOpen.set(false)"
                      class="text-left py-1.5 px-2 rounded-lg hover:bg-[#e8f3ee] transition-colors cursor-pointer">
                      {{ link.label }}
                    </button>
                  }
                </div>
              </div>

            </div>
          </nav>
        }

        <!-- ======================================================== -->
        <!-- SEARCH OVERLAY                                           -->
        <!-- ======================================================== -->
        @if (isSearchOpen()) {
          <div class="absolute left-0 right-0 top-full z-50 border-t border-[#e9eaf1] bg-white px-4 py-3 shadow-xl">
            <div class="relative mx-auto flex max-w-[760px] items-center gap-2 rounded-xl border border-[#d9dfeb] bg-white px-3 py-1.5 focus-within:border-[#315e9d] focus-within:ring-2 focus-within:ring-[#315e9d]/10">
              <mat-icon class="!h-5 !w-5 !text-[19px] text-[#526783]">search</mat-icon>
              <input
                type="text"
                [value]="market.searchQuery()"
                (input)="onSearchInput($event)"
                (focus)="showSuggestions.set(true)"
                (keydown.enter)="executeSearch()"
                (keydown.escape)="isSearchOpen.set(false)"
                placeholder="Search handmade, organic, and GI-tagged local products..."
                class="w-full bg-transparent py-2 text-sm text-[#1d2939] outline-none placeholder:text-[#77849a]"
                aria-label="Search products" />
              <button type="button" (click)="executeSearch()" class="rounded-lg bg-[#19134f] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#29216f] cursor-pointer">Search</button>

              @if (showSuggestions() && suggestions().length > 0) {
                <div class="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-[#e5e8ef] bg-white p-2 text-xs shadow-xl">
                  <div class="flex items-center justify-between px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#758198]">
                    <span>Trending artisan searches</span>
                    <button type="button" (click)="showSuggestions.set(false)" class="text-[#526783] hover:text-[#19134f] cursor-pointer">Close</button>
                  </div>
                  @for (suggestion of suggestions(); track suggestion) {
                    <button
                      type="button"
                      (click)="pickSuggestion(suggestion)"
                      class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[#263d60] hover:bg-[#f4f6fb] cursor-pointer">
                      <span class="flex items-center gap-2">
                        <mat-icon class="!h-4 !w-4 !text-[16px] text-[#315e9d]">trending_up</mat-icon>
                        {{ suggestion }}
                      </span>
                      <span class="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[10px] font-bold text-[#315e9d]">Authentic</span>
                    </button>
                  }
                </div>
              }
            </div>
          </div>
        }

      </div>
    </header>
  `
})
export class Header implements OnDestroy {
  readonly market = inject(MarketplaceService);

  readonly isSearchOpen = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly showSuggestions = signal(false);
  
  // Mega Menu State
  readonly isMegaMenuOpen = signal(false);
  readonly activeColumn = signal<string>('all');
  private pinnedColumnId: string | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  readonly suggestions = signal([
    'Chanderi Silk Saree',
    'Bastar Dhokra Brass',
    'Wild Forest Honey',
    'Jaipur Blue Pottery',
    'Kashmiri Pashmina Shawl',
    'Channapatna Wooden Toys'
  ]);

  // Column 1: Shop by Category
  readonly categoryColumn: MegaMenuColumn = {
    id: 'category',
    icon: 'grid_view',
    title: 'Shop by Category',
    vignetteImage: '/assets/images/card%201.png',
    links: [
      {
        label: 'New Arrivals',
        action: () => {
          this.market.resetFilters();
          this.market.filters.update(f => ({ ...f, sortBy: 'featured' }));
          this.market.setView('catalogue');
          this.market.showToast('Showing New Handcrafted Arrivals', 'info');
        }
      },
      {
        label: 'Bestsellers',
        action: () => {
          this.market.resetFilters();
          this.market.filters.update(f => ({ ...f, sortBy: 'rating' }));
          this.market.setView('catalogue');
          this.market.showToast('Showing Most Loved Bestsellers', 'info');
        }
      },
      {
        label: 'Home & Living',
        action: () => {
          this.market.selectCategory('handicrafts-pottery');
        }
      },
      {
        label: 'Apparel & Textiles',
        action: () => {
          this.market.selectCategory('handloom-textiles');
        }
      },
      {
        label: 'Jewellery',
        action: () => {
          this.market.selectCategory('tribal-metalcraft');
        }
      },
      {
        label: 'Decor & Art',
        action: () => {
          this.market.selectCategory('traditional-art');
        }
      },
      {
        label: 'Gifts & Hampers',
        action: () => {
          this.market.resetFilters();
          this.market.setSearchQuery('Gift');
          this.market.setView('catalogue');
        }
      },
      {
        label: 'Sale & Offers',
        action: () => {
          this.market.resetFilters();
          this.market.filters.update(f => ({ ...f, sortBy: 'discount' }));
          this.market.setView('catalogue');
          this.market.showToast('Showing Direct Artisan Special Offers', 'info');
        }
      }
    ]
  };

  // Column 2: Collections
  readonly collectionsColumn: MegaMenuColumn = {
    id: 'collections',
    icon: 'local_offer',
    title: 'Collections',
    vignetteImage: '/assets/images/card%202.png',
    links: [
      {
        label: 'Festive Collection',
        action: () => {
          this.market.resetFilters();
          this.market.setSearchQuery('Diwali');
          this.market.setView('catalogue');
          this.market.showToast('Showing Festive Puja & Celebration Curations', 'info');
        }
      },
      {
        label: 'Wedding Collection',
        action: () => {
          this.market.resetFilters();
          this.market.setSearchQuery('Banarasi');
          this.market.setView('catalogue');
          this.market.showToast('Showing Wedding & Heirloom Handloom Treasures', 'info');
        }
      },
      {
        label: 'Handcrafted Essentials',
        action: () => {
          this.market.resetFilters();
          this.market.setSearchQuery('Handcrafted');
          this.market.setView('catalogue');
        }
      },
      {
        label: 'Regional Specialities',
        action: () => {
          this.market.resetFilters();
          this.market.filters.update(f => ({ ...f, onlyGI: true }));
          this.market.setView('catalogue');
          this.market.showToast('Showing 100% Certified GI Tagged Specialties', 'info');
        }
      },
      {
        label: 'Sustainable Crafts',
        action: () => {
          this.market.selectCategory('organic-food');
          this.market.showToast('Showing Sustainable & Organic Certified Crafts', 'info');
        }
      },
      {
        label: 'Corporate Gifting',
        action: () => {
          this.market.resetFilters();
          this.market.setSearchQuery('Brass');
          this.market.setView('catalogue');
          this.market.showToast('Showing Bulk & Corporate Gifting Curations', 'info');
        }
      }
    ]
  };

  // Column 3: Artisan & Brands
  readonly artisansColumn: MegaMenuColumn = {
    id: 'artisans',
    icon: 'workspace_premium',
    title: 'Artisan & Brands',
    vignetteImage: '/assets/images/card%203.png',
    links: [
      {
        label: 'Our Artisans',
        action: () => {
          this.market.setView('sellers');
        }
      },
      {
        label: 'Verified Producers',
        action: () => {
          this.market.setView('sellers');
          this.market.showToast('Displaying Certified SHG & Artisan Guilds', 'info');
        }
      },
      {
        label: 'Featured Brands',
        action: () => {
          this.market.setView('sellers');
        }
      },
      {
        label: 'Cooperative Societies',
        action: () => {
          this.market.setView('sellers');
          this.market.showToast('Connecting with Regional Weaver Cooperatives', 'info');
        }
      },
      {
        label: 'State Collections',
        action: () => {
          this.market.setView('craft-map');
          this.market.showToast('Interactive Bharat Craft Map loaded', 'success');
        }
      },
      {
        label: 'Artisan Stories',
        action: () => {
          this.market.setView('about');
        }
      }
    ]
  };

  // Column 4: Help & Support
  readonly supportColumn: MegaMenuColumn = {
    id: 'support',
    icon: 'headset_mic',
    title: 'Help & Support',
    vignetteImage: '/assets/images/card%204.png',
    links: [
      {
        label: 'Track Your Order',
        action: () => {
          this.market.openAccount('orders');
        }
      },
      {
        label: 'Returns & Refunds',
        action: () => {
          this.market.openSupport('returns');
        }
      },
      {
        label: 'Cancellation Policy',
        action: () => {
          this.market.openSupport('cancellation');
        }
      },
      {
        label: 'FAQs',
        action: () => {
          this.market.openSupport('faqs');
        }
      },
      {
        label: 'Contact Us',
        action: () => {
          this.market.openSupport('contact');
        }
      },
      {
        label: 'Grievance Redressal',
        action: () => {
          this.market.openAccount('grievance');
        }
      }
    ]
  };

  // Column 5: My Account
  readonly accountColumn: MegaMenuColumn = {
    id: 'account',
    icon: 'person_outline',
    title: 'My Account',
    vignetteImage: '/assets/images/card%205.png',
    links: [
      {
        label: 'Login / Sign Up',
        action: () => {
          this.market.openAccount('profile');
        }
      },
      {
        label: 'My Orders',
        action: () => {
          this.market.openAccount('orders');
        }
      },
      {
        label: 'My Wishlist',
        action: () => {
          this.market.setView('wishlist');
        }
      },
      {
        label: 'My Addresses',
        action: () => {
          this.market.openAccount('addresses');
        }
      },
      {
        label: 'Payment Methods',
        action: () => {
          this.market.openAccount('payments');
        }
      },
      {
        label: 'Profile Settings',
        action: () => {
          this.market.openAccount('profile');
        }
      }
    ]
  };

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMegaMenu();
    this.isSearchOpen.set(false);
  }

  onNavHover(columnId: string) {
    this.cancelCloseTimer();
    this.activeColumn.set(columnId);
    this.isMegaMenuOpen.set(true);
    this.isSearchOpen.set(false);
  }

  onNavClick(columnId: string) {
    this.cancelCloseTimer();
    if (this.isMegaMenuOpen() && this.pinnedColumnId === columnId) {
      this.closeMegaMenu();
      return;
    }

    this.pinnedColumnId = columnId;
    this.activeColumn.set(columnId);
    this.isMegaMenuOpen.set(true);
    this.isSearchOpen.set(false);
    this.isMobileMenuOpen.set(false);
  }

  onNavLeave() {
    this.cancelCloseTimer();
    if (this.pinnedColumnId !== null) return;

    this.closeTimer = setTimeout(() => {
      this.closeMegaMenu();
    }, 280);
  }

  cancelCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  closeMegaMenu() {
    this.cancelCloseTimer();
    this.pinnedColumnId = null;
    this.isMegaMenuOpen.set(false);
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.market.setSearchQuery(value);
  }

  executeSearch() {
    this.showSuggestions.set(false);
    this.isSearchOpen.set(false);
    this.market.setView('catalogue');
  }

  pickSuggestion(text: string) {
    this.market.setSearchQuery(text);
    this.showSuggestions.set(false);
    this.isSearchOpen.set(false);
    this.market.setView('catalogue');
  }

  navigate(view: 'home' | 'catalogue' | 'sellers' | 'about' | 'craft-map') {
    this.market.setView(view);
    this.isMobileMenuOpen.set(false);
    this.closeMegaMenu();
  }

  ngOnDestroy() {
    this.cancelCloseTimer();
  }
}
