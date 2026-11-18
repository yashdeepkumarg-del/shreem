import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MarketplaceService } from '../../services/marketplace.service';
import { ArtisanCluster } from '../../models/marketplace.model';
import { MP_STORES, MPStore } from '../../data/mp-stores';
import {
  MP_DISTRICTS,
  FLAGSHIP_HUBS,
  getDistrictById,
  getDistrictByGeoName,
  MPDistrictConfig
} from '../../data/mp-districts.config';
import { mpTopoData } from '../../data/topo-data';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

export interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  districtName: string;
  storeCount: number;
  division: string;
  color: string;
  code: string;
}

export interface DistrictCallout {
  id: string;
  name: string;
  count: string;
  color: string;
  pin: [number, number];
  cardPos: { x: number; y: number; w: number; h: number };
  cardAnchor: [number, number];
  curve: string;
  image: string;
}

@Component({
  selector: 'app-craft-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatIconModule],
  styles: [`
    @keyframes hoverTimerFill {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    @keyframes radarPulse {
      0% {
        r: 8px;
        opacity: 0.95;
        stroke-width: 2.5px;
      }
      65% {
        r: 22px;
        opacity: 0.25;
        stroke-width: 1.2px;
      }
      100% {
        r: 28px;
        opacity: 0;
        stroke-width: 0px;
      }
    }
    @keyframes dashFlow {
      from { stroke-dashoffset: 40; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes cardFloat1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3.5px); }
    }
    @keyframes cardFloat2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(3px); }
    }
    @keyframes waveShimmer {
      0%, 100% { opacity: 0.16; transform: scale(1); }
      50% { opacity: 0.28; transform: scale(1.02); }
    }
    .mp-district-poly {
      transition: fill 0.25s ease, stroke 0.25s ease, stroke-width 0.25s ease, filter 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mp-district-poly:hover {
      filter: brightness(1.22) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
    }
  `],
  template: `
    <section id="craft-map-section" class="relative w-full py-10 sm:py-16 bg-[#04241B] text-white overflow-hidden border-y border-[#0E4738]">
      
      <div class="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative">
        
        <!-- MAIN CARD FRAME WITH TEXTURED GREEN STYLING & 2-COLUMN LAYOUT -->
        <div class="relative w-full rounded-[32px] bg-gradient-to-br from-[#042A1D] via-[#063323] to-[#021C13] border border-[#145C42] p-5 sm:p-7 lg:p-9 shadow-[0_30px_70px_rgba(2,30,20,0.5)] flex flex-col overflow-hidden">
          
          <!-- TOP BAR INSIDE CONTAINER -->
          <div class="w-full flex justify-between items-center mb-6 z-10 flex-wrap gap-3">
            <!-- TOP-LEFT: INTERACTIVE GEOGRAPHIC EXPLORER -->
            <div class="flex items-center gap-2.5 text-xs text-[#A7F3D0]">
              <span class="w-7 h-[2px] bg-[#34D399] rounded-full inline-block"></span>
              <span class="font-bold uppercase tracking-widest text-[11px] text-[#34D399]">
                Madhya Pradesh Artisanal &amp; Heritage Map
              </span>
              <span class="w-7 h-[2px] bg-[#34D399] rounded-full inline-block"></span>
            </div>

            <!-- TOP-RIGHT: ACTIONS -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="activeTab.set(activeTab() === 'clusters' ? 'stores' : 'clusters')"
                class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border"
                [class.bg-[#0D5C3A]]="activeTab() === 'clusters'"
                [class.text-white]="activeTab() === 'clusters'"
                [class.border-emerald-400]="activeTab() === 'clusters'"
                [class.bg-white/10]="activeTab() !== 'clusters'"
                [class.text-emerald-100]="activeTab() !== 'clusters'"
                [class.border-white/20]="activeTab() !== 'clusters'"
                [class.hover:bg-white/20]="activeTab() !== 'clusters'"
              >
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">verified</mat-icon>
                <span>GI Clusters (12)</span>
              </button>

              <button
                type="button"
                (click)="resetSelection()"
                class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-emerald-100 flex items-center gap-1.5 transition-all cursor-pointer"
                title="Reset map view"
              >
                <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">restart_alt</mat-icon>
                <span>Reset Map</span>
              </button>
            </div>
          </div>

          <!-- 2-COLUMN SPLIT GRID -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <!-- LEFT COLUMN: INTERACTIVE MADHYA PRADESH D3-GEO SVG MAP CANVAS IN WHITE CONTAINER -->
            <div class="lg:col-span-7 relative bg-white rounded-3xl p-3 sm:p-5 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.25)] border border-white/90 overflow-hidden flex items-center justify-center">
              <svg
                #mapSvg
                viewBox="-24 0 948 920"
                class="w-full h-auto transition-all duration-300 select-none max-h-[820px]"
                style="touch-action: manipulation;"
                (click)="onBackgroundClick($event)"
                aria-label="Interactive map of Madhya Pradesh showing retail presence and craft ateliers across districts"
              >
                <defs>
                  <!-- 3D ELEVATION SHADOWS FOR WHITE CANVAS -->
                  <filter id="subcontinent-depth" x="-15%" y="-15%" width="135%" height="135%">
                    <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#023322" flood-opacity="0.16" />
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#023322" flood-opacity="0.10" />
                  </filter>

                  <filter id="state-active-glow" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#059669" flood-opacity="0.35" />
                    <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#059669" flood-opacity="0.25" />
                  </filter>

                  <filter id="card-floating-shadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#032219" flood-opacity="0.25" />
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#032219" flood-opacity="0.15" />
                  </filter>

                  <filter id="pin-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#011811" flood-opacity="0.30" />
                  </filter>

                  <!-- TEXTURE PATTERN & CANVAS GRADIENTS -->
                  <radialGradient id="subcontinent-light-glow" cx="50%" cy="52%" r="55%">
                    <stop offset="0%" stop-color="#10B981" stop-opacity="0.08" />
                    <stop offset="70%" stop-color="#A7F3D0" stop-opacity="0.03" />
                    <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
                  </radialGradient>

                  <filter id="badge-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.5" />
                  </filter>
                </defs>

                <!-- BACKGROUND: SUBTLE LIGHT GLOW FOR WHITE CONTAINER -->
                <ellipse cx="460" cy="480" rx="380" ry="320" fill="url(#subcontinent-light-glow)" class="pointer-events-none" />

                <!-- TOP-LEFT SWEEPING WAVES IN SHADES OF EMERALD & MINT (LIGHT ACCENTS ON WHITE CANVAS) -->
                <g id="bg-sweeping-curves" class="pointer-events-none select-none" style="transform-origin: 20px 10px; animation: waveShimmer 6s ease-in-out infinite;">
                  <ellipse cx="20" cy="10" rx="360" ry="360" fill="none" stroke="#10B981" stroke-width="34" opacity="0.08" />
                  <ellipse cx="20" cy="10" rx="270" ry="270" fill="none" stroke="#059669" stroke-width="26" opacity="0.06" />
                  <ellipse cx="20" cy="10" rx="180" ry="180" fill="none" stroke="#047857" stroke-width="18" opacity="0.05" />
                </g>

                <!-- LAYER 1: ALL 51 MADHYA PRADESH DISTRICTS WITH VIBRANT REGIONAL COLORS -->
                <g id="mp-districts-landmass" filter="url(#subcontinent-depth)">
                  @for (d of sortedDistrictFeatures(); track d.config.id) {
                    <g
                      [style.transform-origin]="d.centroid[0] + 'px ' + d.centroid[1] + 'px'"
                      [style.transform]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? 'scale(1.035)' : 'scale(1)'"
                      [style.transition]="'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'"
                      [attr.filter]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? 'url(#state-active-glow)' : null"
                    >
                      <path
                        [attr.d]="d.pathD"
                        role="button"
                        tabindex="0"
                        [attr.aria-label]="d.config.name + ', ' + d.config.stores.length + ' retail stores available'"
                        [attr.fill]="getDistrictFill(d.config)"
                        stroke="#FFFFFF"
                        [attr.stroke-width]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? '2.4' : '1.1'"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        vector-effect="non-scaling-stroke"
                        class="mp-district-poly outline-none cursor-pointer transition-colors duration-200"
                        (click)="onDistrictClick(d.config.id, $event)"
                        (mouseenter)="onDistrictHover(d.config.id, $event)"
                        (mousemove)="onStateMouseMove($event)"
                        (mouseleave)="onStateLeave()"
                      />
                    </g>
                  }
                </g>

                <!-- LAYER 2: PLACE NAMES & HIGHLIGHTED STORE COUNT PILL BADGES ON EVERY DISTRICT -->
                <g id="district-place-labels" class="pointer-events-none select-none">
                  @for (d of districtFeatures; track d.config.id) {
                    <g
                      class="transition-all duration-200"
                      [style.transform-origin]="d.centroid[0] + 'px ' + d.centroid[1] + 'px'"
                      [style.transform]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? 'scale(1.22)' : 'scale(1)'"
                    >
                      <!-- District Place Name with contrast-enhancing halo -->
                      <text
                        [attr.x]="d.centroid[0]"
                        [attr.y]="d.centroid[1] - 5"
                        text-anchor="middle"
                        dominant-baseline="central"
                        [attr.font-size]="d.config.stores.length > 1 ? '10' : '8.6'"
                        [attr.font-weight]="d.config.stores.length > 1 || activeDistrictId() === d.config.id ? '800' : '700'"
                        font-family="'Outfit', system-ui, sans-serif"
                        [attr.fill]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? '#FEF08A' : '#FFFFFF'"
                        style="paint-order: stroke fill; stroke: rgba(3, 20, 15, 0.95); stroke-width: 2.8px; stroke-linejoin: round; letter-spacing: 0.2px;"
                      >
                        {{ d.config.mapLabel }}
                      </text>

                      <!-- Highlighted Store Count Pill Badge with District Unique Color Identity -->
                      <g [attr.transform]="'translate(' + d.centroid[0] + ', ' + (d.centroid[1] + 6.5) + ')'">
                        <!-- Pill Background with district color accent and glowing identity -->
                        <rect
                          [attr.x]="d.config.stores.length > 1 ? -17 : -15"
                          y="-5.5"
                          [attr.width]="d.config.stores.length > 1 ? 34 : 30"
                          height="11"
                          rx="5.5"
                          [attr.fill]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? '#059669' : '#022419'"
                          [attr.stroke]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? '#34D399' : '#10B981'"
                          [attr.stroke-width]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? '1.6' : '1.1'"
                          filter="url(#pin-glow)"
                        />
                        <!-- Store Count Text -->
                        <text
                          x="0"
                          y="0.5"
                          text-anchor="middle"
                          dominant-baseline="central"
                          [attr.font-size]="d.config.stores.length > 1 ? '6.8' : '6.2'"
                          font-weight="800"
                          font-family="'Outfit', system-ui, sans-serif"
                          [attr.fill]="activeDistrictId() === d.config.id || hoveredDistrictId() === d.config.id ? '#FFFFFF' : '#A7F3D0'"
                          letter-spacing="0.2px"
                        >
                          {{ d.config.stores.length }} {{ d.config.stores.length === 1 ? 'Store' : 'Stores' }}
                        </text>
                      </g>
                    </g>
                  }
                </g>

              </svg>
            </div>

            <!-- RIGHT COLUMN: OUR MADHYA PRADESH HUBS PANEL -->
            <div class="lg:col-span-5 flex flex-col justify-center lg:pl-2 xl:pl-6">
              
              <!-- Lotus Icon -->
              <div class="w-10 h-10 text-[#34D399] mb-1" aria-hidden="true">
                <svg viewBox="0 0 40 40" class="w-full h-full" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6C17 12 16 19 20 28C24 19 23 12 20 6Z" fill="#34D399" fill-opacity="0.18" />
                  <path d="M20 28C14 26 8 20 6 13C12 13 17 17 20 28Z" fill="#34D399" fill-opacity="0.12" />
                  <path d="M20 28C26 26 32 20 34 13C28 13 23 17 20 28Z" fill="#34D399" fill-opacity="0.12" />
                  <path d="M8 24C11 27 15 28 20 28C25 28 29 27 32 24" />
                  <path d="M14 29C17 31 23 31 26 29" />
                </svg>
              </div>

              <!-- Heading -->
              <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight">
                Madhya Pradesh <span class="text-[#34D399]">Hubs</span>
              </h2>

              <!-- Subtitle -->
              <p class="text-sm text-emerald-100/80 mt-1.5 leading-relaxed max-w-md">
                Explore our artisanal hubs, boutique stores, and certified GI clusters across Madhya Pradesh.
              </p>

              <!-- Two Big Stat Cards (White Theme with Emerald Accents) -->
              <div class="grid grid-cols-2 gap-3.5 mt-5">
                <!-- 51 Districts -->
                <div class="bg-white rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.18)] border border-white hover:border-emerald-200 transition-all hover:scale-[1.01]">
                  <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs border border-emerald-100/80">
                    <mat-icon class="!w-6 !h-6 !text-[24px]">place</mat-icon>
                  </div>
                  <div>
                    <div class="text-2xl sm:text-[26px] font-black text-[#0A3C2B] leading-tight tracking-tight">51 Districts</div>
                    <div class="text-xs text-emerald-800/80 font-bold mt-0.5">Cultural &amp; Craft Hubs</div>
                  </div>
                </div>

                <!-- 62 Stores -->
                <div class="bg-white rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.18)] border border-white hover:border-emerald-200 transition-all hover:scale-[1.01]">
                  <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs border border-emerald-100/80">
                    <mat-icon class="!w-6 !h-6 !text-[24px]">storefront</mat-icon>
                  </div>
                  <div>
                    <div class="text-2xl sm:text-[26px] font-black text-[#0A3C2B] leading-tight tracking-tight">62 Stores</div>
                    <div class="text-xs text-emerald-800/80 font-bold mt-0.5">Boutiques Open</div>
                  </div>
                </div>
              </div>

              <!-- ========================================================
                   CREATIVE LIVE STORE SHOWCASE PAVILION (WHITE THEME & HIGH CONTRAST)
              ======================================================== -->
              @if (activeDistrict(); as dist) {
                <div
                  class="mt-5 bg-white rounded-2xl sm:rounded-3xl border border-white/90 p-4 sm:p-5 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.25)] text-slate-800 relative overflow-hidden transition-all duration-200"
                >
                  
                  <!-- Top Row: Active District Title & Store Switcher -->
                  <div class="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 flex-wrap">
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span
                          class="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs border border-black/10"
                          [style.backgroundColor]="dist.color"
                        ></span>
                        <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                          {{ dist.division }} ({{ dist.code }})
                        </span>
                        <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                          {{ dist.stores.length }} {{ dist.stores.length === 1 ? 'Store' : 'Stores' }}
                        </span>
                      </div>
                      <h3 class="text-2xl font-black text-[#0A3C2B] tracking-tight truncate mt-1">
                        {{ dist.name }}
                      </h3>
                    </div>

                    <!-- Store Selector Pills when multiple stores -->
                    @if (dist.stores.length > 1) {
                      <div class="flex items-center gap-1.5 shrink-0 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto mt-1 sm:mt-0 justify-end">
                        @for (s of dist.stores; track s.id; let sIdx = $index) {
                          <button
                            type="button"
                            (click)="activeStoreIndex.set(sIdx)"
                            class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            [class.bg-[#059669]]="activeStoreIndex() === sIdx"
                            [class.text-white]="activeStoreIndex() === sIdx"
                            [class.shadow-xs]="activeStoreIndex() === sIdx"
                            [class.text-slate-600]="activeStoreIndex() !== sIdx"
                            [class.hover:bg-slate-200]="activeStoreIndex() !== sIdx"
                          >
                            <span>Store {{ sIdx + 1 }}</span>
                          </button>
                        }
                      </div>
                    }
                  </div>

                  <!-- Active Store Card Content -->
                  @if (currentStore(); as store) {
                    <div class="pt-3.5 space-y-3">
                      
                      <!-- Store Header with Photo & Craft Type -->
                      <div class="flex items-center gap-3">
                        <img
                          [src]="store.image"
                          [alt]="store.name"
                          class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-sm"
                        />
                        <div class="min-w-0 flex-1">
                          <div class="flex items-center gap-1.5 flex-wrap">
                            @if (store.featured) {
                              <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                                ★ Flagship
                              </span>
                            }
                            <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                              {{ store.city }}
                            </span>
                          </div>
                          <h4 class="text-base sm:text-lg font-black text-[#0A3C2B] tracking-tight truncate mt-1">
                            {{ store.name }}
                          </h4>
                          <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                            {{ store.description }}
                          </p>
                        </div>
                      </div>

                      <!-- Address & Visiting Info Strip -->
                      <div class="bg-[#F8FAF9] rounded-xl p-3 border border-[#E2ECE5] text-xs text-slate-700 space-y-2">
                        <div class="flex items-start gap-2">
                          <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-700 shrink-0 mt-0.5">place</mat-icon>
                          <span class="text-xs font-medium text-slate-700 leading-snug line-clamp-1">{{ store.address }} – {{ store.pincode }}</span>
                        </div>
                        <div class="flex items-center justify-between gap-2 text-xs text-slate-600 pt-2 border-t border-[#E8F0EA]">
                          <span class="flex items-center gap-1.5 font-medium">
                            <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-emerald-700">schedule</mat-icon>
                            {{ store.hours }}
                          </span>
                          <span class="flex items-center gap-1.5 font-mono font-bold text-emerald-800">
                            <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-emerald-700">call</mat-icon>
                            {{ store.phone }}
                          </span>
                        </div>
                      </div>

                      <!-- Action Buttons: Google Maps Directions & View All Stores Modal -->
                      <div class="flex items-center gap-2.5 pt-1">
                        <a
                          [href]="getDirectionsUrl(store)"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="flex-1 py-2.5 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                        >
                          <mat-icon class="!w-4 !h-4 !text-[18px]">directions</mat-icon>
                          <span>Get Directions</span>
                        </a>

                        <button
                          type="button"
                          (click)="openFullModal()"
                          class="py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#0A3C2B] hover:text-emerald-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all border border-slate-300 hover:border-emerald-600 shadow-xs cursor-pointer shrink-0"
                        >
                          <mat-icon class="!w-4 !h-4 !text-[17px] text-emerald-700">open_in_new</mat-icon>
                          <span>Explorer ({{ dist.stores.length }})</span>
                        </button>
                      </div>

                    </div>
                  }

                </div>
              }

            </div>

          </div>

        </div>

        <!-- ========================================================
             GI CRAFT CLUSTERS STRIP (BHARAT SHILP INTEGRATION)
        ======================================================== -->
        @if (activeTab() === 'clusters') {
          <div class="bg-white rounded-3xl p-6 text-slate-800 border border-slate-200 shadow-xl space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-black text-[#0A3C2B]">Geographical Indication (GI) Craft Clusters</h3>
                <p class="text-xs text-slate-500">Government certified artisan cooperatives directly connected to this platform.</p>
              </div>
              <span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                12 Certified Clusters Active
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (cluster of market.allClusters(); track cluster.id) {
                <div class="p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 bg-stone-50/50 hover:bg-white transition-all flex gap-3 group">
                  <img
                    [src]="cluster.image"
                    [alt]="cluster.name"
                    class="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    referrerpolicy="no-referrer"
                  />
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-1">
                      <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {{ cluster.specialtyTag }}
                      </span>
                      @if (cluster.giTagNumber) {
                        <span class="text-[9px] font-mono text-slate-400">{{ cluster.giTagNumber }}</span>
                      }
                    </div>
                    <h4 class="text-sm font-black text-[#0A3C2B] mt-1 truncate group-hover:text-emerald-700 transition-colors">
                      {{ cluster.craftName }}
                    </h4>
                    <p class="text-xs text-slate-500 truncate">{{ cluster.district }}, {{ cluster.state }}</p>
                    <button
                      type="button"
                      (click)="openClusterStory(cluster)"
                      class="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Artisan Heritage Story</span>
                      <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">arrow_forward</mat-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

      </div>

      <!-- ========================================================
           CENTER STORE PANEL MODAL FOR MADHYA PRADESH
      ======================================================== -->
      @if (isModalOpen() && activeDistrict(); as dist) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
        >
          <!-- FROSTED GLASS BACKDROP BLUR -->
          <div
            (click)="closeModal()"
            class="absolute inset-0 bg-[#031E17]/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          ></div>

          <!-- MODAL CONTAINER DIALOG -->
          <div
            class="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-[28px] border border-[#D7EADE] shadow-[0_25px_60px_-15px_rgba(2,30,20,0.45)] flex flex-col overflow-hidden text-slate-800"
          >
            <!-- MODAL HEADER WITH DISTRICT GRADIENT -->
            <div
              class="p-5 sm:p-6 border-b border-[#E7E5E0] relative"
              [style.background]="'linear-gradient(180deg, ' + dist.lightBg + ' 0%, #FFFFFF 100%)'"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-1.5 flex-1 min-w-0">
                  <!-- Eyebrow & Region Badge with Color Shade Identity -->
                  <div class="flex items-center gap-2 flex-wrap">
                    <span
                      class="w-3 h-3 rounded-full flex-shrink-0 animate-pulse border border-black/20"
                      [style.backgroundColor]="dist.color"
                    ></span>
                    <span
                      class="text-[11px] font-bold uppercase tracking-wider font-mono"
                      [style.color]="dist.activeColor"
                    >
                      {{ dist.division }} ({{ dist.code }}) • {{ dist.stores.length }} Retail Stores
                    </span>
                    <span
                      class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xs"
                      [style.backgroundColor]="dist.color"
                    >
                      {{ dist.shadeName }}
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D5C3A] text-white uppercase tracking-wider shadow-xs">
                      Live Store Explorer
                    </span>
                  </div>

                  <!-- District Name -->
                  <h3 class="text-2xl sm:text-3xl font-black text-[#1E1C1A] tracking-tight truncate">
                    {{ dist.name }}
                  </h3>

                  <!-- Tagline -->
                  <p class="text-xs sm:text-sm text-[#736E65] italic leading-relaxed">
                    {{ dist.tagline }}
                  </p>
                </div>

                <!-- Close Button ('X') -->
                <button
                  type="button"
                  (click)="closeModal()"
                  class="w-9 h-9 rounded-full bg-white/95 hover:bg-[#EAE6DE] text-[#47433D] transition flex items-center justify-center border border-[#E0DCD4] shadow-xs cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95"
                  title="Close (Esc)"
                >
                  <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
                </button>
              </div>

              <!-- ALL 51 DISTRICTS SWITCHER INSIDE MODAL -->
              <div class="pt-3 flex items-center gap-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-700/30 border-t border-[#EAE6DE]/60 mt-3 pb-1">
                <span class="text-[11px] font-bold text-[#0D5C3A] uppercase tracking-wider mr-1 whitespace-nowrap flex items-center gap-1 shrink-0">
                  <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-emerald-600">place</mat-icon>
                  Districts (51):
                </span>
                @for (d of allDistricts; track d.id) {
                  <button
                    type="button"
                    (click)="selectDistrict(d.id, $event)"
                    class="px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border shrink-0"
                    [class.text-white]="d.id === dist.id"
                    [class.shadow-sm]="d.id === dist.id"
                    [class.bg-white]="d.id !== dist.id"
                    [class.hover:bg-slate-50]="d.id !== dist.id"
                    [class.text-[#334155]]="d.id !== dist.id"
                    [class.border-[#CBD5E1]]="d.id !== dist.id"
                    [style.backgroundColor]="d.id === dist.id ? d.color : null"
                    [style.borderColor]="d.id === dist.id ? d.strokeColor : null"
                  >
                    <span
                      class="w-2 h-2 rounded-full border border-black/20"
                      [style.backgroundColor]="d.id === dist.id ? '#FFFFFF' : d.color"
                    ></span>
                    <span class="text-[10px] font-mono font-bold uppercase opacity-85">{{ d.code }}:</span>
                    <span>{{ d.mapLabel || d.name }}</span>
                    <span
                      class="text-[9px] px-1 py-0.2 rounded-full font-bold"
                      [class.bg-black/25]="d.id === dist.id"
                      [class.text-white]="d.id === dist.id"
                      [class.bg-gray-100]="d.id !== dist.id"
                      [class.text-gray-700]="d.id !== dist.id"
                    >
                      {{ d.stores.length }}
                    </span>
                  </button>
                }
              </div>

              <!-- SEARCH & SMART FILTERS BAR -->
              <div class="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <!-- Search Input -->
                <div class="relative flex-1 min-w-[200px]">
                  <mat-icon class="w-3.5 h-3.5 !text-[16px] text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">search</mat-icon>
                  <input
                    type="text"
                    [value]="searchQuery()"
                    (input)="onSearchInput($event)"
                    [placeholder]="'Search stores in ' + dist.name + ' by name, address, craft...'"
                    class="w-full pl-9 pr-8 py-1.5 text-xs bg-white rounded-full border border-[#CBD5E1] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0D5C3A]/30 focus:border-[#0D5C3A] transition"
                  />
                  @if (searchQuery()) {
                    <button
                      type="button"
                      (click)="searchQuery.set('')"
                      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] p-0.5 rounded-full"
                    >
                      <mat-icon class="!w-3 !h-3 !text-[14px]">close</mat-icon>
                    </button>
                  }
                </div>

                <!-- City / Area Filter Pills -->
                <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                  <button
                    type="button"
                    (click)="selectedCity.set('all')"
                    class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border"
                    [style.backgroundColor]="selectedCity() === 'all' ? dist.color : 'rgba(255,255,255,0.8)'"
                    [style.color]="selectedCity() === 'all' ? '#FFFFFF' : '#5E5950'"
                    [style.borderColor]="selectedCity() === 'all' ? dist.strokeColor : '#E2DDD3'"
                  >
                    All Areas ({{ dist.stores.length }})
                  </button>

                  @for (city of dist.cities; track city) {
                    <button
                      type="button"
                      (click)="selectedCity.set(city)"
                      class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border"
                      [style.backgroundColor]="selectedCity() === city ? dist.color : 'rgba(255,255,255,0.8)'"
                      [style.color]="selectedCity() === city ? '#FFFFFF' : '#5E5950'"
                      [style.borderColor]="selectedCity() === city ? dist.strokeColor : '#E2DDD3'"
                    >
                      {{ city }}
                    </button>
                  }

                  <!-- Featured Only Toggle -->
                  <button
                    type="button"
                    (click)="onlyFeatured.set(!onlyFeatured())"
                    class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border flex items-center gap-1"
                    [class.bg-amber-400]="onlyFeatured()"
                    [class.text-stone-900]="onlyFeatured()"
                    [class.border-amber-500]="onlyFeatured()"
                    [class.bg-white]="!onlyFeatured()"
                    [class.text-stone-600]="!onlyFeatured()"
                    [class.border-stone-300]="!onlyFeatured()"
                  >
                    <mat-icon class="!w-3 !h-3 !text-[13px]">star</mat-icon>
                    <span>Featured</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- MODAL BODY: STORES GRID -->
            <div class="p-5 sm:p-6 overflow-y-auto max-h-[58vh] bg-[#FAF8F5]">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @for (store of displayedStores(); track store.id; let idx = $index) {
                  <article
                    class="group relative rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
                  >
                    <!-- STORE IMAGE WITH FALLBACK -->
                    <div class="relative aspect-[16/9] w-full overflow-hidden bg-[#F1F5F9]">
                      <img
                        [src]="store.image"
                        [alt]="store.name"
                        loading="lazy"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                      />
                      <!-- Fallback container -->
                      <div
                        class="hidden w-full h-full flex-col items-center justify-center p-4 text-center"
                        [style.background]="'linear-gradient(135deg, ' + dist.lightBg + ' 0%, #FFFFFF 100%)'"
                      >
                        <mat-icon class="!w-10 !h-10 !text-[40px] text-emerald-800/40 mb-1">storefront</mat-icon>
                        <span class="text-xs font-bold text-[#0D5C3A]">{{ store.name }}</span>
                      </div>

                      <!-- City badge -->
                      <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-white/95 backdrop-blur-xs text-slate-800 shadow-xs border border-white/50">
                        {{ store.city }}
                      </span>

                      <!-- Featured star badge -->
                      @if (store.featured) {
                        <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-stone-900 shadow-xs flex items-center gap-1">
                          <mat-icon class="!w-3 !h-3 !text-[12px]">star</mat-icon>
                          <span>Flagship</span>
                        </span>
                      }
                    </div>

                    <!-- STORE DETAILS -->
                    <div class="p-4 flex-1 flex flex-col justify-between">
                      <div class="space-y-1.5">
                        <h4 class="text-base font-black text-slate-800 group-hover:text-emerald-800 transition-colors">
                          {{ store.name }}
                        </h4>
                        <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {{ store.description }}
                        </p>
                      </div>

                      <div class="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                        <div class="flex items-start gap-1.5">
                          <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-emerald-700 shrink-0 mt-0.5">place</mat-icon>
                          <span class="line-clamp-1">{{ store.address }} – {{ store.pincode }}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-emerald-700 shrink-0">schedule</mat-icon>
                          <span>{{ store.hours }}</span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <mat-icon class="!w-3.5 !h-3.5 !text-[15px] text-emerald-700 shrink-0">phone</mat-icon>
                          <span class="font-mono">{{ store.phone }}</span>
                        </div>
                      </div>

                      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          [href]="getDirectionsUrl(store)"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="px-3.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">directions</mat-icon>
                          <span>Directions</span>
                        </a>
                        <a
                          [href]="store.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0D5C3A] hover:bg-[#09432A] rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Visit Boutique</span>
                          <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">open_in_new</mat-icon>
                        </a>
                      </div>
                    </div>
                  </article>
                }
              </div>
            </div>

            <!-- MODAL FOOTER -->
            <div class="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span class="text-xs text-slate-500 font-medium">
                Showing {{ displayedStores().length }} authentic outposts in {{ dist.name }}
              </span>
              <button
                type="button"
                (click)="closeModal()"
                class="px-4 py-1.5 rounded-full text-xs font-bold bg-[#0A3C2B] hover:bg-[#072B1E] text-white transition cursor-pointer"
              >
                Close Explorer
              </button>
            </div>

          </div>
        </div>
      }

      <!-- ARTISAN STORY MODAL -->
      @if (storyCluster(); as cluster) {
        <div
          role="dialog"
          aria-modal="true"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div class="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-800 space-y-4 shadow-2xl relative">
            <button
              type="button"
              (click)="storyCluster.set(null)"
              class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <mat-icon>close</mat-icon>
            </button>
            
            <div class="flex items-center gap-3">
              <img [src]="cluster.image" [alt]="cluster.name" class="w-16 h-16 rounded-2xl object-cover shrink-0" />
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {{ cluster.specialtyTag }}
                </span>
                <h3 class="text-lg font-black text-[#0A3C2B] mt-0.5">{{ cluster.craftName }}</h3>
                <p class="text-xs text-slate-500">{{ cluster.district }}, {{ cluster.state }}</p>
              </div>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed">{{ cluster.description }}</p>

            <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                (click)="exploreClusterProducts(cluster)"
                class="px-5 py-2.5 text-xs font-bold text-white bg-[#0D5C3A] hover:bg-[#09432A] rounded-xl transition cursor-pointer"
              >
                Browse Products from this Cluster
              </button>
            </div>
          </div>
        </div>
      }

    </section>
  `
})
export class CraftMap implements OnInit, OnDestroy {
  readonly market = inject(MarketplaceService);
  private hoverTimer: any = null;

  readonly activeTab = signal<'stores' | 'clusters'>('stores');
  readonly activeDistrictId = signal<string | null>('indore');
  readonly isModalOpen = signal<boolean>(false);
  readonly hoveredDistrictId = signal<string | null>(null);
  readonly activeStoreIndex = signal<number>(0);

  readonly currentStore = computed(() => {
    const dist = this.activeDistrict();
    if (!dist || !dist.stores.length) return null;
    const idx = this.activeStoreIndex();
    return dist.stores[idx] || dist.stores[0];
  });

  readonly selectedCity = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly onlyFeatured = signal<boolean>(false);

  readonly storyCluster = signal<ArtisanCluster | null>(null);

  readonly tooltip = signal<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    districtName: '',
    storeCount: 0,
    division: '',
    color: '#0D5C3A',
    code: 'MP'
  });

  readonly allDistricts = MP_DISTRICTS;
  readonly flagshipDistricts = FLAGSHIP_HUBS;

  districtFeatures: Array<{
    feature: any;
    pathD: string;
    geoName: string;
    config: MPDistrictConfig;
    centroid: [number, number];
  }> = [];

  readonly flagshipCallouts: DistrictCallout[] = [
    {
      id: 'indore',
      name: 'Indore',
      count: '3 Stores',
      color: '#34D399',
      pin: [201, 598],
      cardPos: { x: 14, y: 565, w: 172, h: 54 },
      cardAnchor: [186, 592],
      curve: 'M 201,598 C 160,598 175,592 186,592',
      image: '/assets/images/card1_opt.png'
    },
    {
      id: 'bhopal',
      name: 'Bhopal',
      count: '3 Stores',
      color: '#34D399',
      pin: [359, 516],
      cardPos: { x: 310, y: 440, w: 172, h: 54 },
      cardAnchor: [396, 470],
      curve: 'M 359,516 C 340,490 370,470 396,470',
      image: '/assets/monuments/madhya-pradesh.jpg'
    },
    {
      id: 'gwalior',
      name: 'Gwalior',
      count: '2 Stores',
      color: '#34D399',
      pin: [432, 239],
      cardPos: { x: 235, y: 170, w: 172, h: 54 },
      cardAnchor: [407, 197],
      curve: 'M 432,239 C 390,239 390,197 407,197',
      image: '/assets/images/card2_opt.png'
    },
    {
      id: 'jabalpur',
      name: 'Jabalpur',
      count: '2 Stores',
      color: '#34D399',
      pin: [612, 543],
      cardPos: { x: 675, y: 520, w: 175, h: 54 },
      cardAnchor: [675, 547],
      curve: 'M 612,543 C 640,543 650,547 675,547',
      image: '/assets/images/category_brass_dhokra_1793447459537.jpg'
    },
    {
      id: 'ujjain',
      name: 'Ujjain',
      count: '2 Stores',
      color: '#34D399',
      pin: [190, 532],
      cardPos: { x: 14, y: 460, w: 172, h: 54 },
      cardAnchor: [186, 487],
      curve: 'M 190,532 C 160,532 170,487 186,487',
      image: '/assets/images/card4_opt.png'
    },
    {
      id: 'chhatarpur',
      name: 'Khajuraho',
      count: '2 Stores',
      color: '#34D399',
      pin: [581, 374],
      cardPos: { x: 645, y: 310, w: 185, h: 54 },
      cardAnchor: [645, 337],
      curve: 'M 581,374 C 615,374 625,337 645,337',
      image: '/assets/monuments/madhya-pradesh.jpg'
    },
    {
      id: 'ashoknagar',
      name: 'Chanderi',
      count: '2 Stores',
      color: '#34D399',
      pin: [406, 395],
      cardPos: { x: 470, y: 320, w: 182, h: 54 },
      cardAnchor: [470, 347],
      curve: 'M 406,395 C 440,395 445,347 470,347',
      image: '/assets/images/category_handloom_saree_1793447459310.jpg'
    },
    {
      id: 'khargone-west-nimar',
      name: 'Maheshwar',
      count: '2 Stores',
      color: '#34D399',
      pin: [200, 683],
      cardPos: { x: 50, y: 735, w: 185, h: 54 },
      cardAnchor: [235, 762],
      curve: 'M 200,683 C 200,720 180,750 235,762',
      image: '/assets/images/card3_opt.png'
    }
  ];

  readonly activeDistrict = computed(() => {
    const id = this.activeDistrictId();
    if (!id) return null;
    return getDistrictById(id) || null;
  });

  readonly sortedDistrictFeatures = computed(() => {
    const activeId = this.activeDistrictId();
    return [...this.districtFeatures].sort((a, b) => {
      if (a.config.id === activeId) return 1;
      if (b.config.id === activeId) return -1;
      if (a.config.isFlagship && !b.config.isFlagship) return 1;
      if (!a.config.isFlagship && b.config.isFlagship) return -1;
      return 0;
    });
  });


  readonly displayedStores = computed(() => {
    const active = this.activeDistrict();
    if (!active) return [];
    const city = this.selectedCity();
    const feat = this.onlyFeatured();
    const q = this.searchQuery().trim().toLowerCase();

    return active.stores.filter((store) => {
      const matchesCity = city === 'all' || store.city.toLowerCase() === city.toLowerCase();
      const matchesFeat = !feat || Boolean(store.featured);
      const matchesSearch =
        !q ||
        store.name.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.description.toLowerCase().includes(q) ||
        store.pincode.includes(q);
      return matchesCity && matchesFeat && matchesSearch;
    });
  });

  ngOnInit() {
    this.computeProjection();
  }

  private computeProjection() {
    try {
      const geojson = feature(mpTopoData as any, (mpTopoData as any).objects.MadhyaPradesh) as any;
      const proj = geoMercator().fitExtent(
        [
          [30, 80],
          [890, 840]
        ],
        geojson
      );
      const pathGen = geoPath().projection(proj);

      this.districtFeatures = [];

      geojson.features.forEach((feat: any) => {
        const geoName = feat.properties.Dist_Name;
        const config = getDistrictByGeoName(geoName);
        const pathD = pathGen(feat) || '';
        const [cx, cy] = pathGen.centroid(feat);

        if (config) {
          this.districtFeatures.push({
            feature: feat,
            pathD,
            geoName,
            config,
            centroid: [cx, cy]
          });
        }
      });
    } catch (err) {
      console.error('Failed to compute D3 TopoJSON projection for Madhya Pradesh:', err);
    }
  }

  getDistrictFill(config: MPDistrictConfig): string {
    const isActive = this.activeDistrictId() === config.id;
    const isHovered = this.hoveredDistrictId() === config.id;
    if (isActive) return config.activeColor;
    if (isHovered) return config.hoverColor;
    return config.color;
  }

  private clearHoverTimer() {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }

  private lastClosedDistrictId: string | null = null;

  selectDistrict(districtId: string, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.activeDistrictId.set(districtId);
    this.hoveredDistrictId.set(districtId);
    this.activeStoreIndex.set(0);
    this.selectedCity.set('all');
    this.searchQuery.set('');
    this.onlyFeatured.set(false);
  }

  onDistrictHover(districtId: string, event?: MouseEvent) {
    this.activeDistrictId.set(districtId);
    this.hoveredDistrictId.set(districtId);
    this.activeStoreIndex.set(0);
  }

  onDistrictClick(districtId: string, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.selectDistrict(districtId, event);
    this.isModalOpen.set(true);
  }

  openFullModal() {
    this.isModalOpen.set(true);
  }

  onStateMouseMove(event: MouseEvent) {
    this.tooltip.update((prev) => ({
      ...prev,
      x: event.clientX,
      y: event.clientY
    }));
  }

  onStateLeave() {
    this.clearHoverTimer();
    this.hoveredDistrictId.set(null);
    this.lastClosedDistrictId = null;
    this.tooltip.update((t) => ({ ...t, visible: false }));
  }


  onBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target?.tagName === 'svg') {
      this.resetSelection();
    }
  }

  resetSelection() {
    this.clearHoverTimer();
    this.activeDistrictId.set(null);
    this.hoveredDistrictId.set(null);
    this.isModalOpen.set(false);
    this.tooltip.update((t) => ({ ...t, visible: false }));
  }

  closeModal() {
    this.clearHoverTimer();
    this.lastClosedDistrictId = this.activeDistrictId();
    this.isModalOpen.set(false);
  }

  onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  getDirectionsUrl(store: MPStore): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${store.name}, ${store.address}, ${store.city} ${store.pincode}`
    )}`;
  }

  openClusterStory(cluster: ArtisanCluster) {
    this.storyCluster.set(cluster);
  }

  exploreClusterProducts(cluster: ArtisanCluster) {
    this.storyCluster.set(null);
    this.market.selectedCluster.set(cluster);
    this.market.setSearchQuery(cluster.craftName);
    this.market.setView('catalogue');
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.storyCluster()) {
        this.storyCluster.set(null);
      } else if (this.isModalOpen()) {
        this.closeModal();
      } else if (this.activeDistrictId()) {
        this.resetSelection();
      }
    }
  }

  ngOnDestroy() {
    this.clearHoverTimer();
  }
}
