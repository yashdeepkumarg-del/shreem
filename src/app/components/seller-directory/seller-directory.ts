import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { Seller } from '../../models/marketplace.model';
import { HERO_IMAGE } from '../../data/mock-data';

@Component({
  selector: 'app-seller-directory',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="max-w-[1320px] mx-auto px-4 sm:px-6 py-8">
      
      <!-- Directory Heading -->
      <div class="mb-8">
        <div class="flex items-center gap-1.5 text-xs font-bold text-[#176B45] uppercase tracking-wider">
          <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">verified</mat-icon>
          <span>Government Registered Producer Organizations</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-[#15365B] mt-1">
          {{ market.currentLanguage() === 'en' ? 'Verified Rural Artisans & SHG Cooperatives' : 'सत्यापित ग्रामीण कारीगर एवं स्वयं सहायता समूह' }}
        </h1>
        <p class="text-xs sm:text-sm text-[#667085] mt-1 max-w-2xl leading-relaxed">
          Every organization on Shreem is verified through the Ministry of Rural Development, TRIFED, or State Handloom Boards with direct bank transfer integration.
        </p>
      </div>

      <!-- Filter / Search Row for Sellers -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 mb-6 text-xs">
        <div class="flex items-center gap-2 flex-1 max-w-md">
          <mat-icon class="!w-4 !h-4 !text-[18px] text-slate-400">search</mat-icon>
          <input
            type="text"
            [value]="sellerQuery()"
            (input)="sellerQuery.set($any($event.target).value)"
            placeholder="Search cooperative by name, craft, or state..."
            class="w-full bg-transparent focus:outline-none text-[#1D2939]"
          />
        </div>

        <div class="flex items-center gap-2">
          <span class="text-[#667085]">Filter by Type:</span>
          <select 
            [value]="typeFilter()"
            (change)="typeFilter.set($any($event.target).value)"
            class="bg-[#F8F7F2] border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-[#15365B] focus:outline-none">
            <option value="all">All Producer Types</option>
            <option value="SHG">Self Help Groups (SHG)</option>
            <option value="Cooperative">Weaver & Forest Co-ops</option>
            <option value="Tribal Producer">Tribal Producers (TRIFED)</option>
            <option value="Artisan Guild">Artisan Guilds</option>
          </select>
        </div>
      </div>

      <!-- Sellers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (seller of filteredSellers(); track seller.id) {
          <article class="bg-white rounded-2xl border border-slate-200 hover:border-[#176B45] hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
            
            <!-- Cover / Product Banner -->
            <div class="h-32 bg-slate-100 relative overflow-hidden">
              <img
                [src]="seller.heroImage || fallbackImage"
                [alt]="seller.name"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Tag on Banner -->
              <div class="absolute bottom-2.5 left-3 text-white text-[10px] font-bold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                Est. {{ seller.foundedYear }} · {{ seller.district }}, {{ seller.state }}
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-[#176B45] uppercase tracking-wider text-[10px]">{{ seller.type }}</span>
                  <span class="flex items-center gap-0.5 text-amber-500 font-bold">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">star</mat-icon>
                    <span>{{ seller.rating }}</span>
                  </span>
                </div>

                <h3 class="text-base font-bold text-[#15365B] mt-1 leading-snug">
                  {{ market.currentLanguage() === 'en' ? seller.name : (seller.hindiName || seller.name) }}
                </h3>

                <p class="text-xs text-[#667085] mt-1.5 leading-relaxed line-clamp-2">
                  {{ seller.description }}
                </p>

                <!-- Producer Statistics Strip -->
                <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                  <div class="p-2 bg-[#F8F7F2] rounded-lg">
                    <div class="text-[10px] text-[#667085]">Artisan Members</div>
                    <div class="font-bold text-[#15365B]">{{ seller.memberCount }} Artisans</div>
                  </div>
                  <div class="p-2 bg-[#F8F7F2] rounded-lg">
                    <div class="text-[10px] text-[#667085]">Specialty Craft</div>
                    <div class="font-bold text-[#15365B] truncate">{{ seller.craftSpecialty }}</div>
                  </div>
                </div>
              </div>

              <!-- Action button -->
              <div class="pt-2 flex items-center justify-between">
                <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  Reg: {{ seller.govtRegNumber }}
                </span>
                <button
                  type="button"
                  (click)="viewSellerProducts(seller)"
                  class="px-3.5 py-1.5 bg-[#176B45] hover:bg-[#15365B] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                  <span>View Products</span>
                  <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">arrow_forward</mat-icon>
                </button>
              </div>

            </div>

          </article>
        }
      </div>

    </div>
  `
})
export class SellerDirectory {
  readonly market = inject(MarketplaceService);
  readonly fallbackImage = HERO_IMAGE;

  readonly sellerQuery = signal<string>('');
  readonly typeFilter = signal<string>('all');

  readonly filteredSellers = computed(() => {
    const list = this.market.allSellers();
    const q = this.sellerQuery().toLowerCase().trim();
    const type = this.typeFilter();

    return list.filter(s => {
      if (type !== 'all' && s.type !== type) return false;
      if (q) {
        const matchesName = s.name.toLowerCase().includes(q) || (s.hindiName && s.hindiName.includes(q));
        const matchesCraft = s.craftSpecialty.toLowerCase().includes(q);
        const matchesState = s.state.toLowerCase().includes(q) || s.district.toLowerCase().includes(q);
        if (!matchesName && !matchesCraft && !matchesState) return false;
      }
      return true;
    });
  });

  viewSellerProducts(seller: Seller) {
    this.market.setSearchQuery(seller.name);
    this.market.setView('catalogue');
  }
}
