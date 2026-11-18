import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Product } from '../../models/marketplace.model';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <article 
      tabindex="0"
      role="button"
      (mouseenter)="scheduleProductPreview()"
      (mouseleave)="cancelProductPreview()"
      (keydown.enter)="openProductDetail()"
      (click)="openProductDetail()"
      class="group bg-white rounded-xl border border-[#E5E7EB] hover:border-[#176B45]/50 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative cursor-pointer focus-visible:outline-[#176B45]">
      
      <!-- Top Image Slot with Styled CSS/SVG Fallback -->
      <div class="relative aspect-4/3 overflow-hidden bg-[#F8F7F2] p-2.5 sm:aspect-square sm:p-3">
        <span class="pointer-events-none absolute inset-8 z-0 rounded-full bg-white/80 blur-2xl" aria-hidden="true"></span>
        <img
          [src]="product().primaryImage"
          [alt]="product().name"
          referrerpolicy="no-referrer"
          loading="lazy"
          class="relative z-10 h-full w-full scale-[1.04] rounded-xl object-cover shadow-[0_8px_20px_rgba(21,54,91,0.12)] transition-transform duration-500 group-hover:scale-110"
        />

        <!-- Subtle Top Left Trust Markers (Unboxed clean text) -->
        <div class="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          @if (product().isGI) {
            <span class="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[#176B45] border border-emerald-200/80 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
              <mat-icon class="!w-3 !h-3 !text-[12px]">verified</mat-icon>
              <span>GI Certified</span>
            </span>
          }
          @if (product().isSilkMark) {
            <span class="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-indigo-900 border border-indigo-200/80 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
              <span>Silk Mark</span>
            </span>
          }
          @if (product().isOrganic) {
            <span class="inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
              <span>100% Organic</span>
            </span>
          }
        </div>

        <!-- Wishlist Button (stops propagation) -->
        <button
          type="button"
          (click)="onToggleWishlist($event)"
          [class.text-rose-600]="isWishlisted()"
          [class.text-slate-400]="!isWishlisted()"
          class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-500 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
          [attr.aria-label]="isWishlisted() ? 'Remove from wishlist' : 'Add to wishlist'">
          <mat-icon class="!w-4.5 !h-4.5 !text-[18px]">
            {{ isWishlisted() ? 'favorite' : 'favorite_border' }}
          </mat-icon>
        </button>

        <!-- Discount Badge if applicable -->
        @if (product().discountPercent > 0) {
          <div class="absolute bottom-2.5 left-2.5 bg-[#D99A32] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
            {{ product().discountPercent }}% OFF
          </div>
        }
      </div>

      <!-- Content Area -->
      <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 bg-gradient-to-br from-emerald-50 via-white to-amber-50/80 group-hover:from-emerald-100 group-hover:to-amber-100">
        
        <!-- Clean unboxed metadata with middot separator -->
        <div class="flex items-center gap-1.5 text-[11px] text-[#667085] leading-none">
          <span class="font-medium text-[#176B45]">{{ product().sellerType }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ product().state }}</span>
          @if (product().isOdop) {
            <span aria-hidden="true">·</span>
            <span class="text-amber-700 font-semibold">ODOP</span>
          }
        </div>

        <!-- Product Title -->
        <h3 class="text-xs sm:text-sm font-bold text-[#15365B] group-hover:text-[#176B45] transition-colors line-clamp-2 leading-snug">
          {{ market.currentLanguage() === 'en' ? product().name : (product().hindiName || product().name) }}
        </h3>

        <!-- Seller Cooperative Name -->
        <div class="text-[11px] text-[#667085] line-clamp-1">
          By <span class="text-[#1D2939] font-medium">{{ product().sellerName }}</span>
        </div>

        <!-- Rating & Reviews -->
        <div class="flex items-center gap-1.5 text-xs">
          <div class="flex items-center text-amber-500">
            <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">star</mat-icon>
            <span class="font-bold text-[#1D2939] text-xs ml-0.5">{{ product().rating }}</span>
          </div>
          <span class="text-[11px] text-[#667085]">({{ product().reviewCount }})</span>
          <span class="text-[11px] text-emerald-700 font-medium ml-auto">Direct DBT</span>
        </div>

        <!-- Price Row & Add to Cart Action -->
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div class="flex items-baseline gap-1.5">
              <span class="text-base sm:text-lg font-extrabold text-[#15365B] tabular-nums">
                ₹{{ product().price }}
              </span>
              @if (product().originalPrice > product().price) {
                <span class="text-xs text-[#667085] line-through tabular-nums">
                  ₹{{ product().originalPrice }}
                </span>
              }
            </div>
            <div class="text-[10px] text-emerald-700 font-medium leading-none">Free delivery on ₹499+</div>
          </div>

          <!-- Add to Cart Button -->
          <button
            type="button"
            (click)="onAddToCart($event)"
            class="px-3 py-1.5 bg-emerald-50 hover:bg-[#176B45] text-[#176B45] hover:text-white border border-emerald-200 hover:border-[#176B45] rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs">
            <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">add_shopping_cart</mat-icon>
            <span>Add</span>
          </button>
        </div>

      </div>

    </article>
  `
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly market = inject(MarketplaceService);
  private previewTimer: ReturnType<typeof setTimeout> | null = null;

  scheduleProductPreview() {
    this.cancelProductPreview();
    this.previewTimer = setTimeout(() => {
      this.market.openProductPreview(this.product());
      this.previewTimer = null;
    }, 2000);
  }

  cancelProductPreview() {
    if (this.previewTimer !== null) {
      clearTimeout(this.previewTimer);
      this.previewTimer = null;
    }
  }

  openProductDetail() {
    this.cancelProductPreview();
    this.market.openProductDetail(this.product());
  }

  isWishlisted(): boolean {
    return this.market.isInWishlist(this.product().id);
  }

  onToggleWishlist(event: MouseEvent) {
    event.stopPropagation();
    this.market.toggleWishlist(this.product().id);
  }

  onAddToCart(event: MouseEvent) {
    event.stopPropagation();
    this.market.addToCart(this.product(), 1);
  }
}
