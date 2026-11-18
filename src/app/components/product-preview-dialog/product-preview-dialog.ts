import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/marketplace.model';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'app-product-preview-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (market.previewProduct(); as product) {
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-preview-title"
        class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-md animate-in fade-in duration-200"
        (click)="close()">
        <section
          class="relative my-auto grid w-full max-w-3xl overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl animate-in zoom-in-95 duration-200 sm:grid-cols-2"
          (click)="$event.stopPropagation()">
          <div class="relative min-h-56 bg-[#F8F7F2] sm:min-h-[380px]">
            <img
              [src]="product.primaryImage"
              [alt]="product.name"
              referrerpolicy="no-referrer"
              class="absolute inset-0 h-full w-full object-cover" />
            @if (product.discountPercent > 0) {
              <span class="absolute bottom-4 left-4 rounded-md bg-[#D99A32] px-2.5 py-1 text-xs font-extrabold text-white shadow">
                {{ product.discountPercent }}% OFF
              </span>
            }
          </div>

          <div class="flex flex-col p-5 sm:p-7">
            <div class="mb-5 flex items-start justify-between gap-3">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#176B45]">Quick product view</span>
              <button
                type="button"
                (click)="close()"
                aria-label="Close product preview"
                class="-mt-2 -mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
                <mat-icon class="!h-5 !w-5 !text-[20px]">close</mat-icon>
              </button>
            </div>

            <div class="mb-2 flex flex-wrap gap-2">
              @if (product.isGI) {
                <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800">GI Certified</span>
              }
              @if (product.isSilkMark) {
                <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-800">Silk Mark</span>
              }
              @if (product.isOrganic) {
                <span class="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">100% Organic</span>
              }
            </div>

            <h2 id="product-preview-title" class="text-xl font-black leading-snug text-[#15365B] sm:text-2xl">
              {{ market.currentLanguage() === 'en' ? product.name : (product.hindiName || product.name) }}
            </h2>
            <p class="mt-1 text-xs text-[#667085]">
              {{ product.category }} · {{ product.state }}
            </p>

            <div class="mt-4 flex items-center gap-1.5 text-sm">
              <mat-icon class="!h-4 !w-4 !text-[16px] text-amber-500">star</mat-icon>
              <span class="font-bold text-[#1D2939]">{{ product.rating }}</span>
              <span class="text-xs text-[#667085]">({{ product.reviewCount }} reviews)</span>
            </div>

            <p class="mt-4 line-clamp-4 text-sm leading-relaxed text-slate-600">
              {{ product.description }}
            </p>

            <div class="mt-5 border-t border-slate-100 pt-4">
              <p class="text-xs text-[#667085]">Artisan seller</p>
              <p class="mt-0.5 text-sm font-semibold text-[#1D2939]">{{ product.sellerName }}</p>
              <div class="mt-4 flex flex-wrap items-baseline gap-2">
                <span class="text-2xl font-black tabular-nums text-[#15365B]">₹{{ product.price }}</span>
                @if (product.originalPrice > product.price) {
                  <span class="text-sm text-[#667085] line-through">₹{{ product.originalPrice }}</span>
                }
              </div>
            </div>

            <div class="mt-auto flex flex-col gap-2 pt-6">
              <button
                type="button"
                (click)="viewDetails(product)"
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#176B45] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0D5C3A]">
                View product details
                <mat-icon class="!h-4 !w-4 !text-[16px]">arrow_forward</mat-icon>
              </button>
              <button
                type="button"
                (click)="market.addToCart(product, 1)"
                class="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-[#176B45] transition-colors hover:bg-emerald-100">
                <mat-icon class="!h-4 !w-4 !text-[16px]">add_shopping_cart</mat-icon>
                Add to cart
              </button>
            </div>
          </div>
        </section>
      </div>
    }
  `
})
export class ProductPreviewDialog {
  readonly market = inject(MarketplaceService);

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.market.previewProduct()) {
      this.close();
    }
  }

  close() {
    this.market.closeProductPreview();
  }

  viewDetails(product: Product) {
    this.market.openProductDetail(product);
  }
}
