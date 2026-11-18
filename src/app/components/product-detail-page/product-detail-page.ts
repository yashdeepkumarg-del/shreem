import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/marketplace.model';

@Component({
  selector: 'app-product-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ProductCard],
  template: `
    @if (product(); as p) {
      <div class="bg-[#F7F8F5] min-h-screen pb-16">
        
        <!-- Breadcrumb & Top Bar Navigation -->
        <div class="bg-white border-b border-[#E5E7EB]">
          <div class="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            <!-- Breadcrumbs -->
            <nav class="flex items-center gap-2 text-[#667085] flex-wrap" aria-label="Breadcrumb">
              <button 
                type="button" 
                (click)="market.setView('home')" 
                class="hover:text-[#0D5C3A] cursor-pointer flex items-center gap-1">
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">home</mat-icon>
                <span>Home</span>
              </button>
              <span>/</span>
              <button 
                type="button" 
                (click)="market.setView('catalogue')" 
                class="hover:text-[#0D5C3A] cursor-pointer">
                All Products
              </button>
              <span>/</span>
              <button 
                type="button" 
                (click)="market.selectCategory(p.categorySlug)" 
                class="hover:text-[#0D5C3A] cursor-pointer">
                {{ p.category }}
              </button>
              <span>/</span>
              <span class="font-bold text-[#15365B] truncate max-w-[240px] sm:max-w-md">
                {{ p.name }}
              </span>
            </nav>

            <!-- Back to Catalogue & Share Actions -->
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="market.backFromProductDetail()"
                class="inline-flex items-center gap-1 text-xs font-bold text-[#0D5C3A] hover:text-[#09432A] cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_back</mat-icon>
                <span>Back</span>
              </button>
              <span class="text-slate-300">|</span>
              <button
                type="button"
                (click)="shareProduct(p)"
                class="inline-flex items-center gap-1 text-xs text-[#667085] hover:text-[#0D5C3A] cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px]">share</mat-icon>
                <span>Share</span>
              </button>
            </div>

          </div>
        </div>

        <!-- Main Product Section -->
        <div class="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 sm:pt-8 space-y-10">
          
          <!-- Product Showcase Split (Gallery Left + Purchase Module Right) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <!-- LEFT COLUMN: Gallery & Certifications (Span 7) -->
            <div class="lg:col-span-7 space-y-4">
              
              <!-- Main High-Resolution Image Container -->
              <div class="relative bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm aspect-4/3 sm:aspect-16/11 group">
                <img
                  [src]="selectedImage()"
                  [alt]="p.name"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <!-- Top Left: Certification Badges -->
                <div class="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                  @if (p.isGI) {
                    <span class="inline-flex items-center gap-1.5 bg-[#0D5C3A] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">verified</mat-icon>
                      <span>GI Certified Origin</span>
                    </span>
                  }
                  @if (p.isSilkMark) {
                    <span class="inline-flex items-center gap-1.5 bg-[#15365B] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">workspace_premium</mat-icon>
                      <span>Silk Mark Certified</span>
                    </span>
                  }
                  @if (p.isOrganic) {
                    <span class="inline-flex items-center gap-1.5 bg-[#D97706] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
                      <mat-icon class="!w-4 !h-4 !text-[16px]">eco</mat-icon>
                      <span>100% Organic (Jaivik Bharat)</span>
                    </span>
                  }
                </div>

                <!-- Top Right: Wishlist Button -->
                <button
                  type="button"
                  (click)="toggleWishlist()"
                  [class.text-rose-600]="isWishlisted()"
                  [class.text-slate-400]="!isWishlisted()"
                  class="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  [attr.aria-label]="isWishlisted() ? 'Remove from wishlist' : 'Save to wishlist'">
                  <mat-icon class="!w-5 !h-5 !text-[22px]">
                    {{ isWishlisted() ? 'favorite' : 'favorite_border' }}
                  </mat-icon>
                </button>

                <!-- Zoom hint -->
                <div class="absolute bottom-3 right-3 bg-black/50 text-white text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-xs">
                  <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">zoom_in</mat-icon>
                  <span>Hover to zoom</span>
                </div>
              </div>

              <!-- Thumbnails Strip -->
              @if (p.galleryImages.length > 1) {
                <div class="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                  @for (img of p.galleryImages; track img) {
                    <button
                      type="button"
                      (click)="selectedImage.set(img)"
                      [class.ring-2]="selectedImage() === img"
                      [class.ring-[#0D5C3A]]="selectedImage() === img"
                      class="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 cursor-pointer hover:opacity-90 transition-all">
                      <img [src]="img" alt="Thumbnail" referrerpolicy="no-referrer" class="w-full h-full object-cover"/>
                    </button>
                  }
                </div>
              }

            </div>

            <!-- RIGHT COLUMN: Purchase Module & Specifications (Span 5) -->
            <div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-5">
              
              <!-- Category & Origin Kicker -->
              <div class="flex flex-wrap items-center gap-2 text-xs text-[#667085]">
                <span class="font-semibold text-[#0D5C3A] uppercase tracking-wider">{{ p.category }}</span>
                <span>•</span>
                <span>{{ p.district }}, {{ p.state }}</span>
                @if (p.isOdop) {
                  <span class="bg-amber-100 text-[#92400E] font-bold px-2 py-0.5 rounded text-[10px]">
                    ODOP
                  </span>
                }
              </div>

              <!-- Product Headline -->
              <div>
                <h1 class="text-2xl sm:text-3xl font-semibold text-[#11233B] leading-tight break-words">
                  {{ market.currentLanguage() === 'en' ? p.name : (p.hindiName || p.name) }}
                </h1>
                @if (p.hindiName && market.currentLanguage() === 'en') {
                  <div class="text-sm font-medium text-[#667085] mt-1">
                    {{ p.hindiName }}
                  </div>
                }
              </div>

              <!-- Seller / Cooperative Card -->
              <div class="p-3.5 bg-[#FAF8F5] rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-10 h-10 rounded-lg bg-emerald-100 text-[#0D5C3A] flex items-center justify-center font-bold text-base shrink-0">
                    <mat-icon class="!w-5 !h-5 !text-[22px]">diversity_3</mat-icon>
                  </div>
                  <div class="min-w-0">
                    <div class="text-[10px] text-[#667085] uppercase tracking-wider font-semibold">Made by</div>
                    <div class="font-bold text-[#11233B] truncate">{{ p.sellerName }}</div>
                    <div class="text-[10px] text-[#667085]">{{ p.sellerType }} · {{ p.district }}, {{ p.state }}</div>
                  </div>
                </div>

                <button
                  type="button"
                  (click)="filterBySeller(p.sellerName)"
                  class="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-[#0D5C3A] shrink-0 transition-colors cursor-pointer">
                  More from maker
                </button>
              </div>

              <!-- Rating & Reviews -->
              <div class="flex items-center gap-2 text-xs">
                <div class="flex items-center text-amber-500 font-bold">
                  <mat-icon class="!w-4 !h-4 !text-[18px]">star</mat-icon>
                  <span class="text-[#1D2939] ml-1 text-sm">{{ p.rating }}</span>
                </div>
                <span class="text-[#667085]">({{ p.reviewCount }} reviews)</span>
                <span class="text-slate-300">|</span>
                <span class="text-emerald-700 font-bold flex items-center gap-0.5">
                  <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">check_circle</mat-icon>
                  <span>In stock</span>
                </span>
              </div>

              <!-- Price Box -->
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
                <div class="flex items-baseline gap-2.5 flex-wrap">
                  <span class="text-3xl sm:text-4xl font-black text-[#11233B] tabular-nums">
                    ₹{{ p.price }}
                  </span>
                  @if (p.originalPrice > p.price) {
                    <span class="text-base text-[#667085] line-through tabular-nums">
                      ₹{{ p.originalPrice }}
                    </span>
                    <span class="text-xs font-black text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                      Save {{ p.discountPercent }}% (₹{{ p.originalPrice - p.price }} off)
                    </span>
                  }
                </div>
              </div>

              <!-- PIN Code Delivery Check -->
              <div class="space-y-1.5 pt-1">
                <label for="pdp-pincode" class="block text-xs font-bold text-[#11233B]">
                  Check delivery options
                </label>
                <div class="flex items-center gap-2">
                  <input
                    id="pdp-pincode"
                    type="text"
                    maxlength="6"
                    [value]="pincodeInput()"
                    (input)="pincodeInput.set($any($event.target).value)"
                    placeholder="6-digit PIN code"
                    class="px-3.5 py-2.5 text-xs bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#0D5C3A] flex-1 text-[#1D2939]"
                  />
                  <button
                    type="button"
                    (click)="checkPincode()"
                    class="px-4 py-2.5 bg-[#15365B] hover:bg-[#0D2644] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
                    Check
                  </button>
                </div>
                @if (pincodeStatus()) {
                  <div class="text-xs text-emerald-800 font-semibold flex items-center gap-1 mt-1 bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-[#0D5C3A]">local_shipping</mat-icon>
                    <span>{{ pincodeStatus() }}</span>
                  </div>
                }
              </div>

              <!-- Quantity Selector & Total Price Preview -->
              <div class="flex items-center justify-between pt-2">
                <div class="flex items-center gap-3">
                  <span class="text-xs font-bold text-[#11233B]">Quantity:</span>
                  <div class="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      (click)="decrementQty()"
                      [disabled]="quantity() <= 1"
                      class="px-3 py-1.5 hover:bg-slate-100 text-slate-700 disabled:opacity-40 transition-colors font-bold cursor-pointer"
                      aria-label="Decrease quantity">
                      -
                    </button>
                    <span class="px-4 py-1.5 text-xs font-bold tabular-nums">{{ quantity() }}</span>
                    <button
                      type="button"
                      (click)="incrementQty()"
                      [disabled]="quantity() >= p.stockCount"
                      class="px-3 py-1.5 hover:bg-slate-100 text-slate-700 disabled:opacity-40 transition-colors font-bold cursor-pointer"
                      aria-label="Increase quantity">
                      +
                    </button>
                  </div>
                </div>

                <div class="text-right">
                  <div class="text-[10px] text-[#667085]">Item Total:</div>
                  <div class="text-base font-black text-[#11233B] tabular-nums">
                    ₹{{ p.price * quantity() }}
                  </div>
                </div>
              </div>

              <!-- Main Purchase CTAs: Add to Cart & Buy Now -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  (click)="addToCart()"
                  class="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-[#0D5C3A] text-[#0D5C3A] font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                  <mat-icon class="!w-5 !h-5 !text-[20px]">add_shopping_cart</mat-icon>
                  <span>Add to bag</span>
                </button>

                <button
                  type="button"
                  (click)="buyNow()"
                  class="w-full py-3.5 px-4 bg-[#0D5C3A] hover:bg-[#09432A] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg">
                  <mat-icon class="!w-5 !h-5 !text-[20px]">flash_on</mat-icon>
                  <span>Buy Now</span>
                </button>
              </div>

              <!-- Secondary Actions: Wishlist toggle -->
              <button
                type="button"
                (click)="toggleWishlist()"
                class="w-full py-2.5 text-xs font-bold text-[#15365B] hover:text-[#0D5C3A] hover:bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[18px]" [class.text-rose-600]="isWishlisted()">
                  {{ isWishlisted() ? 'favorite' : 'favorite_border' }}
                </mat-icon>
                <span>{{ isWishlisted() ? 'Saved in Your Wishlist' : 'Add to Wishlist' }}</span>
              </button>

            </div>

          </div>

          <!-- Deep-Dive Details Tabs Section -->
          <div class="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-4 sm:p-7 space-y-6">
            
            <!-- Tab Headers -->
            <div class="flex items-center gap-4 border-b border-slate-200 overflow-x-auto no-scrollbar pb-1 text-xs sm:text-sm font-semibold">
              
              <button
                type="button"
                (click)="activeTab.set('description')"
                [class.border-[#0D5C3A]]="activeTab() === 'description'"
                [class.text-[#0D5C3A]]="activeTab() === 'description'"
                [class.border-transparent]="activeTab() !== 'description'"
                [class.text-[#667085]]="activeTab() !== 'description'"
                class="pb-3 border-b-2 hover:text-[#0D5C3A] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">article</mat-icon>
                <span>Description</span>
              </button>

              <button
                type="button"
                (click)="activeTab.set('story')"
                [class.border-[#0D5C3A]]="activeTab() === 'story'"
                [class.text-[#0D5C3A]]="activeTab() === 'story'"
                [class.border-transparent]="activeTab() !== 'story'"
                [class.text-[#667085]]="activeTab() !== 'story'"
                class="pb-3 border-b-2 hover:text-[#0D5C3A] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">diversity_1</mat-icon>
                <span>Craft story</span>
              </button>

              <button
                type="button"
                (click)="activeTab.set('specs')"
                [class.border-[#0D5C3A]]="activeTab() === 'specs'"
                [class.text-[#0D5C3A]]="activeTab() === 'specs'"
                [class.border-transparent]="activeTab() !== 'specs'"
                [class.text-[#667085]]="activeTab() !== 'specs'"
                class="pb-3 border-b-2 hover:text-[#0D5C3A] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">tune</mat-icon>
                <span>Details</span>
              </button>

              <button
                type="button"
                (click)="activeTab.set('shipping')"
                [class.border-[#0D5C3A]]="activeTab() === 'shipping'"
                [class.text-[#0D5C3A]]="activeTab() === 'shipping'"
                [class.border-transparent]="activeTab() !== 'shipping'"
                [class.text-[#667085]]="activeTab() !== 'shipping'"
                class="pb-3 border-b-2 hover:text-[#0D5C3A] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">local_shipping</mat-icon>
                <span>Delivery</span>
              </button>

              <button
                type="button"
                (click)="activeTab.set('reviews')"
                [class.border-[#0D5C3A]]="activeTab() === 'reviews'"
                [class.text-[#0D5C3A]]="activeTab() === 'reviews'"
                [class.border-transparent]="activeTab() !== 'reviews'"
                [class.text-[#667085]]="activeTab() !== 'reviews'"
                class="pb-3 border-b-2 hover:text-[#0D5C3A] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5">
                <mat-icon class="!w-4 !h-4 !text-[18px]">star_outline</mat-icon>
                <span>Reviews ({{ p.reviews.length }})</span>
              </button>

            </div>

            <!-- TAB 1: Description -->
            @if (activeTab() === 'description') {
              <div class="space-y-5 text-xs sm:text-sm text-[#1D2939] leading-relaxed">
                <p>{{ p.description }}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="p-4 bg-[#F7F8F5] rounded-xl border border-slate-200">
                    <div class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">Craft</div>
                    <div class="font-semibold text-sm text-[#11233B] mt-1">{{ p.category }}</div>
                  </div>
                  <div class="p-4 bg-[#F7F8F5] rounded-xl border border-slate-200">
                    <div class="text-[11px] font-semibold text-[#667085] uppercase tracking-wider">Origin</div>
                    <div class="font-semibold text-sm text-[#11233B] mt-1">{{ p.district }}, {{ p.state }}</div>
                  </div>
                </div>
              </div>
            }

            <!-- TAB 2: Heritage Story -->
            @if (activeTab() === 'story') {
              <div class="bg-[#F7F8F5] p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 text-xs sm:text-sm leading-relaxed">
                <div class="flex items-center gap-2">
                  <mat-icon class="!w-5 !h-5 !text-[22px] text-[#0D5C3A]">history_edu</mat-icon>
                  <h3 class="text-base font-semibold text-[#11233B]">About this craft</h3>
                </div>
                <p class="text-[#1D2939]">{{ p.craftStory }}</p>
                <div class="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-emerald-100 text-[#0D5C3A] flex items-center justify-center shrink-0">
                      <mat-icon class="!w-6 !h-6 !text-[24px]">diversity_3</mat-icon>
                    </div>
                    <div>
                      <div class="font-semibold text-[#11233B]">{{ p.sellerName }}</div>
                      <div class="text-[#667085] mt-0.5">{{ p.district }}, {{ p.state }}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    (click)="goToCraftMap(p)"
                    class="px-3.5 py-2 bg-[#0D5C3A] hover:bg-[#09432A] text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">map</mat-icon>
                    <span>View on Craft Map</span>
                  </button>
                </div>
              </div>
            }

            <!-- TAB 3: Technical Specifications -->
            @if (activeTab() === 'specs') {
              <div class="space-y-4">
                <table class="w-full table-fixed text-xs sm:text-sm border-collapse">
                  <tbody>
                    <tr class="border-b border-slate-200">
                      <td class="py-3 px-3 sm:px-4 font-semibold text-[#667085] w-1/3 bg-slate-50 break-words">Material</td>
                      <td class="py-3 px-3 sm:px-4 font-medium text-[#11233B] break-words">{{ p.specifications.material }}</td>
                    </tr>
                    <tr class="border-b border-slate-200">
                      <td class="py-3 px-3 sm:px-4 font-semibold text-[#667085] bg-slate-50 break-words">Origin</td>
                      <td class="py-3 px-3 sm:px-4 font-medium text-[#11233B] break-words">{{ p.specifications.origin }}</td>
                    </tr>
                    @if (p.specifications.dimensions) {
                      <tr class="border-b border-slate-200">
                        <td class="py-3 px-3 sm:px-4 font-semibold text-[#667085] bg-slate-50 break-words">Dimensions</td>
                        <td class="py-3 px-3 sm:px-4 font-medium text-[#11233B] break-words">{{ p.specifications.dimensions }}</td>
                      </tr>
                    }
                    @if (p.specifications.weight) {
                      <tr class="border-b border-slate-200">
                        <td class="py-3 px-3 sm:px-4 font-semibold text-[#667085] bg-slate-50 break-words">Weight</td>
                        <td class="py-3 px-3 sm:px-4 font-medium text-[#11233B] break-words">{{ p.specifications.weight }}</td>
                      </tr>
                    }
                    @if (p.specifications.artisanCluster) {
                      <tr class="border-b border-slate-200">
                        <td class="py-3 px-3 sm:px-4 font-semibold text-[#667085] bg-slate-50 break-words">Craft cluster</td>
                        <td class="py-3 px-3 sm:px-4 font-medium text-[#11233B] break-words">{{ p.specifications.artisanCluster }}</td>
                      </tr>
                    }
                    <tr class="border-b border-slate-200">
                      <td class="py-3 px-3 sm:px-4 font-semibold text-[#667085] bg-slate-50 break-words">Care</td>
                      <td class="py-3 px-3 sm:px-4 font-medium text-[#11233B] break-words">{{ p.specifications.careInstructions }}</td>
                    </tr>
                    @if (p.specifications.certification) {
                      <tr class="bg-emerald-50/60">
                        <td class="py-3 px-3 sm:px-4 font-semibold text-[#0D5C3A] bg-emerald-100/50 break-words">Certification</td>
                        <td class="py-3 px-3 sm:px-4 font-semibold text-[#0D5C3A] break-words">{{ p.specifications.certification }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }

            <!-- TAB 4: Delivery -->
            @if (activeTab() === 'shipping') {
              <div class="flex items-start gap-3 p-4 sm:p-5 bg-[#F7F8F5] rounded-xl border border-slate-200 text-xs sm:text-sm text-[#475467] leading-relaxed">
                <mat-icon class="!w-5 !h-5 !text-[20px] text-[#0D5C3A] shrink-0">local_shipping</mat-icon>
                <p>Delivery availability and any applicable return terms are confirmed during checkout.</p>
              </div>
            }

            <!-- TAB 5: Reviews -->
            @if (activeTab() === 'reviews') {
              <div class="space-y-6">
                
                <!-- Rating Summary Box -->
                <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <div class="text-center">
                      <div class="text-4xl font-black text-[#11233B]">{{ p.rating }}</div>
                      <div class="flex items-center text-amber-500 justify-center mt-1">
                        @for (s of [1,2,3,4,5]; track s) {
                          <mat-icon class="!w-3.5 !h-3.5 !text-[16px]">
                            {{ p.rating >= s ? 'star' : (p.rating >= s - 0.5 ? 'star_half' : 'star_outline') }}
                          </mat-icon>
                        }
                      </div>
                      <div class="text-[11px] text-[#667085] mt-0.5">{{ p.reviewCount }} reviews</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    (click)="isWritingReview.set(!isWritingReview())"
                    class="px-4 py-2.5 bg-[#0D5C3A] text-white text-xs font-bold rounded-xl hover:bg-[#09432A] transition-colors self-start sm:self-auto cursor-pointer">
                    {{ isWritingReview() ? 'Close' : 'Write a review' }}
                  </button>
                </div>

                <!-- Review Form -->
                @if (isWritingReview()) {
                  <div class="p-5 bg-white rounded-xl border border-slate-300 space-y-3 text-xs">
                    <div class="font-semibold text-sm text-[#11233B]">Share your review</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label for="review-author-name" class="block font-semibold mb-1">Your Name</label>
                        <input id="review-author-name" type="text" placeholder="Your name" class="w-full px-3 py-2 bg-slate-50 border rounded-lg"/>
                      </div>
                      <div>
                        <label for="review-author-location" class="block font-semibold mb-1">City & State</label>
                        <input id="review-author-location" type="text" placeholder="City, State" class="w-full px-3 py-2 bg-slate-50 border rounded-lg"/>
                      </div>
                    </div>
                    <div>
                      <label for="review-content-text" class="block font-semibold mb-1">Your Review</label>
                      <textarea id="review-content-text" rows="3" placeholder="Share your experience with the craftsmanship..." class="w-full px-3 py-2 bg-slate-50 border rounded-lg"></textarea>
                    </div>
                    <button type="button" (click)="submitReview()" class="px-4 py-2 bg-[#0D5C3A] text-white font-bold rounded-lg cursor-pointer">
                      Submit review
                    </button>
                  </div>
                }

                <!-- Review List -->
                @if (p.reviews.length === 0) {
                  <div class="py-8 text-center text-xs text-[#667085]">
                    No reviews yet.
                  </div>
                } @else {
                  <div class="space-y-3">
                    @for (rev of p.reviews; track rev.id) {
                      <div class="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                        <div class="flex items-center justify-between">
                          <span class="font-semibold text-[#11233B] text-sm">{{ rev.userName }} ({{ rev.city }}, {{ rev.state }})</span>
                          <span class="text-[11px] text-[#667085]">{{ rev.date }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <div class="flex items-center text-amber-500">
                            @for (s of [1,2,3,4,5]; track s) {
                              <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">
                                {{ rev.rating >= s ? 'star' : (rev.rating >= s - 0.5 ? 'star_half' : 'star_outline') }}
                              </mat-icon>
                            }
                          </div>
                        </div>
                        <p class="text-[#1D2939] leading-relaxed pt-1 text-xs sm:text-sm">
                          "{{ rev.comment }}"
                        </p>
                      </div>
                    }
                  </div>
                }

              </div>
            }

          </div>

          <!-- Related / More Artisan Products from this Category Section -->
          <div class="space-y-5 pt-2">
            <div class="flex items-end justify-between">
              <div>
                <h2 class="text-xl sm:text-2xl font-semibold text-[#11233B]">
                  You may also like
                </h2>
              </div>
              <button
                type="button"
                (click)="market.setView('catalogue')"
                class="text-xs font-bold text-[#0D5C3A] hover:underline flex items-center gap-1 cursor-pointer">
                <span>View all</span>
                <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
              </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              @for (rel of relatedProducts(); track rel.id) {
                <app-product-card [product]="rel" />
              }
            </div>
          </div>

        </div>

      </div>
    }
  `
})
export class ProductDetailPage {
  readonly market = inject(MarketplaceService);

  readonly product = computed(() => this.market.selectedProduct());
  readonly selectedImage = signal<string>(this.product()?.primaryImage || '');
  readonly quantity = signal<number>(1);
  readonly activeTab = signal<'description' | 'story' | 'specs' | 'shipping' | 'reviews'>('description');
  readonly pincodeInput = signal<string>('110001');
  readonly pincodeStatus = signal<string>('');
  readonly isWritingReview = signal<boolean>(false);

  constructor() {
    const p = this.product();
    if (p) {
      this.selectedImage.set(p.primaryImage);
    }
  }

  readonly relatedProducts = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.market.allProducts()
      .filter(item => item.id !== p.id)
      .slice(0, 4);
  });

  isWishlisted(): boolean {
    const p = this.product();
    return p ? this.market.isInWishlist(p.id) : false;
  }

  toggleWishlist() {
    const p = this.product();
    if (p) {
      this.market.toggleWishlist(p.id);
    }
  }

  incrementQty() {
    const p = this.product();
    if (p && this.quantity() < p.stockCount) {
      this.quantity.update(q => q + 1);
    }
  }

  decrementQty() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  checkPincode() {
    const pin = this.pincodeInput().trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      this.pincodeStatus.set(`Delivery availability for ${pin} is confirmed at checkout.`);
    } else {
      this.pincodeStatus.set('Enter a valid 6-digit PIN code.');
    }
  }

  filterBySeller(sellerName: string) {
    this.market.setSearchQuery(sellerName);
    this.market.setView('catalogue');
  }

  addToCart() {
    const p = this.product();
    if (p) {
      this.market.addToCart(p, this.quantity());
      this.market.toggleCartDrawer(true);
    }
  }

  buyNow() {
    const p = this.product();
    if (p) {
      this.market.addToCart(p, this.quantity());
      this.market.toggleCheckoutModal(true);
    }
  }

  shareProduct(p: Product) {
    navigator.clipboard?.writeText(window.location.href);
    this.market.showToast(`Link to "${p.name.slice(0, 30)}..." copied to clipboard!`, 'info');
  }

  submitReview() {
    this.market.showToast('Thank you for your feedback.', 'success');
    this.isWritingReview.set(false);
  }

  goToCraftMap(p: Product) {
    const cluster = this.market.allClusters().find(c => c.state.toLowerCase() === p.state.toLowerCase()) || this.market.allClusters()[0];
    if (cluster) {
      this.market.selectedCluster.set(cluster);
    }
    this.market.setView('craft-map');
  }
}
