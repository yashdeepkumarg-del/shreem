import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { HERO_IMAGE } from '../../data/mock-data';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="max-w-[1320px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      
      <!-- Hero Intro -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#176B45] text-xs font-bold uppercase tracking-wider">
            <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">assured_workload</mat-icon>
            <span>Government Digital Public Infrastructure</span>
          </div>

          <h1 class="text-3xl sm:text-4xl font-black text-[#15365B] leading-tight">
            About Shreem: Dignity, Heritage, and Direct Livelihoods
          </h1>

          <p class="text-sm text-[#1D2939] leading-relaxed">
            Shreem was conceived as an authentic digital home for India's 7 million traditional artisans and rural entrepreneurs. While commercial marketplaces charge up to 40% in seller fees and promote mass-produced factory imitation goods, Shreem is a government-backed public utility ensuring zero platform cuts and absolute authenticity.
          </p>

          <div class="pt-2 flex flex-wrap gap-4 text-xs font-bold text-[#15365B]">
            <div class="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-[#176B45]">verified</mat-icon>
              <span>100% GI Registry Verified</span>
            </div>
            <div class="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-[#176B45]">account_balance</mat-icon>
              <span>Zero Middleman Cuts</span>
            </div>
            <div class="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-[#176B45]">local_shipping</mat-icon>
              <span>India Post Speed Post</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <img 
              [src]="heroImg" 
              alt="Indian Handicrafts" 
              referrerpolicy="no-referrer"
              class="w-full h-full object-cover"/>
          </div>
        </div>
      </div>

      <!-- The 3 Pillars of Authenticity -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        
        <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#176B45] flex items-center justify-center font-bold">
            <mat-icon class="!w-5 !h-5 !text-[22px]">verified</mat-icon>
          </div>
          <h3 class="text-base font-bold text-[#15365B]">Geographical Indications (GI Tag)</h3>
          <p class="text-[#667085] leading-relaxed">
            Registered under the Geographical Indications of Goods Act (1999). Each craft corresponds strictly to its certified origin cluster—whether Chanderi in Madhya Pradesh or Bastar in Chhattisgarh.
          </p>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-[#D99A32] flex items-center justify-center font-bold">
            <mat-icon class="!w-5 !h-5 !text-[22px]">workspace_premium</mat-icon>
          </div>
          <h3 class="text-base font-bold text-[#15365B]">Silk Mark & Handloom Mark</h3>
          <p class="text-[#667085] leading-relaxed">
            All silk sarees and handloom textiles carry the Silk Mark Organization of India tag with woven QR codes that can be authenticated using any mobile phone.
          </p>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
            <mat-icon class="!w-5 !h-5 !text-[22px]">energy_savings_leaf</mat-icon>
          </div>
          <h3 class="text-base font-bold text-[#15365B]">Jaivik Bharat & NMR Certified</h3>
          <p class="text-[#667085] leading-relaxed">
            Wild honey, cold-pressed oils, and spices undergo rigorous nuclear magnetic resonance (NMR) and FSSAI organic testing to certify absence of added sugars or synthetic chemicals.
          </p>
        </div>

      </div>

      <!-- Direct Benefit Transfer (DBT) Flow Explanation -->
      <div class="p-8 bg-[#15365B] text-white rounded-2xl shadow-md space-y-6">
        <div>
          <h3 class="text-xl font-bold">Transparent Direct-to-Artisan Payment Architecture</h3>
          <p class="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            See exactly where every rupee of your purchase travels:
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div class="p-4 bg-white/10 rounded-xl border border-white/10">
            <div class="text-[10px] text-amber-300 font-bold uppercase">Step 01</div>
            <div class="font-bold text-sm text-white mt-1">Citizen Purchase</div>
            <div class="text-[11px] text-slate-300 mt-1">Payment safely held in RBI-monitored government escrow gateway.</div>
          </div>

          <div class="p-4 bg-white/10 rounded-xl border border-white/10">
            <div class="text-[10px] text-amber-300 font-bold uppercase">Step 02</div>
            <div class="font-bold text-sm text-white mt-1">Speed Post Pickup</div>
            <div class="text-[11px] text-slate-300 mt-1">India Post staff collects packaged goods directly from village SHG centers.</div>
          </div>

          <div class="p-4 bg-white/10 rounded-xl border border-white/10">
            <div class="text-[10px] text-amber-300 font-bold uppercase">Step 03</div>
            <div class="font-bold text-sm text-white mt-1">Delivery Confirmation</div>
            <div class="text-[11px] text-slate-300 mt-1">Buyer verifies receipt of authentic GI-certified craft.</div>
          </div>

          <div class="p-4 bg-white/10 rounded-xl border border-white/10">
            <div class="text-[10px] text-emerald-300 font-bold uppercase">Step 04</div>
            <div class="font-bold text-sm text-white mt-1">Direct Bank Transfer</div>
            <div class="text-[11px] text-slate-300 mt-1">100% of product price remitted directly to the artisan cooperative bank account.</div>
          </div>
        </div>
      </div>

    </div>
  `
})
export class AboutSection {
  readonly market = inject(MarketplaceService);
  readonly heroImg = HERO_IMAGE;
}
