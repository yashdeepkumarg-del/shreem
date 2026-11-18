import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

interface FeaturedCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  background: string;
  accent: string;
  cardImage: string;
}

@Component({
  selector: 'app-category-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section
      class="relative mt-0 bg-gradient-to-b from-transparent via-[#faf8f3]/80 to-[#faf8f3] pb-7 min-[360px]:-mt-6 sm:-mt-10 sm:pb-9 transition-all duration-300"
      [class.z-50]="activeRevealedCardId() !== null"
      [class.z-20]="activeRevealedCardId() === null"
      aria-label="Featured craft collections">

      @if (activeRevealedCardId() !== null) {
        <div
          class="fixed inset-0 z-30 bg-black/45 backdrop-blur-md transition-opacity duration-500 cursor-pointer animate-in fade-in"
          (click)="onCardMouseLeave()"
          aria-hidden="true">
        </div>
      }

      <div class="relative z-40 mx-auto grid max-w-[1640px] grid-cols-1 gap-4 px-4 min-[480px]:grid-cols-2 sm:gap-5 sm:px-7 lg:grid-cols-3 xl:grid-cols-5">
        @for (category of categories; track category.id) {
          <div
            class="relative h-[165px] overflow-visible transition-all duration-500 ease-out sm:h-[178px] xl:h-[195px]"
            [class.z-50]="activeRevealedCardId() === category.id"
            [class.z-10]="activeRevealedCardId() !== null && activeRevealedCardId() !== category.id"
            [class.filter]="activeRevealedCardId() !== null && activeRevealedCardId() !== category.id"
            [class.blur-[5px]]="activeRevealedCardId() !== null && activeRevealedCardId() !== category.id"
            [class.opacity-35]="activeRevealedCardId() !== null && activeRevealedCardId() !== category.id"
            [class.scale-[0.96]]="activeRevealedCardId() !== null && activeRevealedCardId() !== category.id"
            [class.pointer-events-none]="activeRevealedCardId() !== null && activeRevealedCardId() !== category.id"
            (mouseenter)="onCardMouseEnter(category.id)"
            (mouseleave)="onCardMouseLeave()">

            <button
              type="button"
              (click)="selectCategory(category.slug)"
              class="group absolute inset-x-0 bottom-0 z-20 flex min-h-[165px] w-full cursor-pointer flex-col items-start justify-between rounded-[24px] border border-[#17443b]/35 p-5 text-left transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D5C3A] sm:min-h-[178px] sm:p-5.5 xl:min-h-[195px] xl:p-6"
              [style.min-height]="activeRevealedCardId() === category.id ? '278px' : null"
              [class.shadow-[0_32px_65px_-12px_rgba(0,0,0,0.45),0_0_0_2px_rgba(255,255,255,0.95),0_0_35px_rgba(255,255,255,0.35)]]="activeRevealedCardId() === category.id"
              [class.shadow-[0_12px_22px_-14px_rgba(27,39,35,.34)]]="activeRevealedCardId() !== category.id"
              [style.background-color]="category.background">

              <span class="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/60 via-transparent to-white/20" aria-hidden="true"></span>

              <div
                class="pointer-events-none absolute -top-[122px] inset-x-0 z-10 flex h-[245px] items-end justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                [class.opacity-100]="activeRevealedCardId() === category.id"
                [class.translate-y-0]="activeRevealedCardId() === category.id"
                [class.scale-100]="activeRevealedCardId() === category.id"
                [class.opacity-0]="activeRevealedCardId() !== category.id"
                [class.translate-y-8]="activeRevealedCardId() !== category.id"
                [class.scale-90]="activeRevealedCardId() !== category.id">
                <span class="pointer-events-none absolute bottom-6 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-white/65 blur-3xl" aria-hidden="true"></span>
                <img
                  [src]="category.cardImage"
                  [alt]="category.name + ' craft illustration'"
                  class="relative z-10 h-full w-full max-w-full origin-bottom object-contain object-bottom drop-shadow-[0_14px_10px_rgba(17,24,39,0.18)] transition-transform duration-500"
                  [class.scale-110]="activeRevealedCardId() === category.id"
                  loading="eager"
                />
              </div>

              <div
                class="pointer-events-none absolute left-6 right-6 top-0 h-[3.5px] overflow-hidden rounded-full bg-black/5"
                [class.hidden]="activeRevealedCardId() === category.id">
                <div
                  class="h-full rounded-full transition-all ease-linear"
                  [style.background-color]="category.accent"
                  [style.transition-duration]="hoveredCardId() === category.id && activeRevealedCardId() !== category.id ? '1000ms' : '150ms'"
                  [class.w-full]="hoveredCardId() === category.id"
                  [class.w-0]="hoveredCardId() !== category.id"
                  [class.opacity-100]="hoveredCardId() === category.id"
                  [class.opacity-0]="hoveredCardId() !== category.id">
                </div>
              </div>

              <div
                class="relative z-20 max-w-[210px] transition-all duration-500"
                [class.mt-[103px]]="activeRevealedCardId() === category.id">
                <span class="block text-[18px] font-black leading-tight tracking-[-.02em] text-[#123b36] sm:text-[19px] xl:text-[21px]">
                  {{ category.name }}
                </span>
                <span class="mt-1.5 block max-w-[195px] text-[12.5px] leading-[1.38] text-[#394650] sm:mt-2 sm:text-[13.5px]">
                  {{ category.description }}
                </span>
              </div>

              <div class="relative z-20 mt-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-extrabold text-[#17443b] transition-all group-hover:bg-white/90 group-hover:shadow-xs sm:gap-2 sm:px-3.5"
                  [style.border-color]="category.accent"
                  [class.bg-white]="activeRevealedCardId() === category.id"
                  [class.shadow-md]="activeRevealedCardId() === category.id">
                  <span>Explore Products</span>
                  <span class="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#0b4c3e] text-white transition-transform group-hover:translate-x-1">
                    <mat-icon class="!h-3.5 !w-3.5 !text-[15px]">arrow_forward</mat-icon>
                  </span>
                </span>
              </div>

              <svg
                class="pointer-events-none absolute -bottom-6 -right-6 h-[150px] w-[150px] transition-opacity duration-500"
                [class.opacity-15]="activeRevealedCardId() !== category.id"
                [class.opacity-10]="activeRevealedCardId() === category.id"
                viewBox="0 0 160 160"
                fill="none"
                aria-hidden="true"
                [style.color]="category.accent">
                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="80" cy="80" r="3" stroke-width="1.5"/>
                  <circle cx="80" cy="80" r="10" stroke-width="1"/>
                  <circle cx="80" cy="80" r="20" stroke-width="1"/>
                  <circle cx="80" cy="80" r="32" stroke-width="1"/>
                  <circle cx="80" cy="80" r="46" stroke-width="1"/>
                  <circle cx="80" cy="80" r="62" stroke-width="0.8"/>
                  <line x1="80" y1="4" x2="80" y2="156" stroke-width="0.6"/>
                  <line x1="4" y1="80" x2="156" y2="80" stroke-width="0.6"/>
                  <line x1="23" y1="23" x2="137" y2="137" stroke-width="0.6"/>
                  <line x1="137" y1="23" x2="23" y2="137" stroke-width="0.6"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(0 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(45 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(90 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(135 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(180 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(225 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(270 80 80)"/>
                  <ellipse cx="80" cy="68" rx="3.5" ry="7" stroke-width="1" transform="rotate(315 80 80)"/>
                  <ellipse cx="80" cy="58" rx="4.5" ry="10" stroke-width="1" transform="rotate(0 80 80)"/>
                  <ellipse cx="80" cy="58" rx="4.5" ry="10" stroke-width="1" transform="rotate(90 80 80)"/>
                  <ellipse cx="80" cy="58" rx="4.5" ry="10" stroke-width="1" transform="rotate(180 80 80)"/>
                  <ellipse cx="80" cy="58" rx="4.5" ry="10" stroke-width="1" transform="rotate(270 80 80)"/>
                </g>
              </svg>
            </button>
          </div>
        }
      </div>
    </section>
  `
})
export class CategoryGrid implements OnInit {
  readonly market = inject(MarketplaceService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly hoveredCardId = signal<string | null>(null);
  readonly activeRevealedCardId = signal<string | null>(null);

  readonly categories: FeaturedCategory[] = [
    {
      id: 'home-living',
      name: 'Home & Living',
      description: 'Décor, pottery, textiles and brass artifacts',
      slug: 'handicrafts-pottery',
      background: '#fff0e3',
      accent: '#e98934',
      cardImage: '/assets/images/card1_opt.png'
    },
    {
      id: 'apparel-textiles',
      name: 'Apparel & Textiles',
      description: 'Handlooms, ethnic wear and weaver looms',
      slug: 'handloom-textiles',
      background: '#e5f4e4',
      accent: '#4d9b63',
      cardImage: '/assets/images/card2_opt.png'
    },
    {
      id: 'jewellery',
      name: 'Jewellery',
      description: 'Handcrafted tribal, bell-metal and silver art',
      slug: 'tribal-metalcraft',
      background: '#fde5e5',
      accent: '#e66d6e',
      cardImage: '/assets/images/card3_opt.png'
    },
    {
      id: 'gifts',
      name: 'Gifts & Hampers',
      description: 'Curated artisanal gifts for every festive occasion',
      slug: 'handicrafts-pottery',
      background: '#eee8ff',
      accent: '#9072d9',
      cardImage: '/assets/images/card4_opt.png'
    },
    {
      id: 'sustainable',
      name: 'Sustainable Crafts',
      description: 'Eco-friendly, organic and natural artisan crafts',
      slug: 'organic-food',
      background: '#e1f4f8',
      accent: '#55b6c4',
      cardImage: '/assets/images/card5_opt.png'
    }
  ];

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.categories.forEach((category) => {
        const image = new Image();
        image.src = category.cardImage;
      });
    }
  }

  onCardMouseEnter(id: string) {
    if (this.activeRevealedCardId() === id) return;
    this.hoveredCardId.set(id);
    this.activeRevealedCardId.set(id);
    this.cdr.markForCheck();
  }

  onCardMouseLeave() {
    this.hoveredCardId.set(null);
    this.activeRevealedCardId.set(null);
    this.cdr.markForCheck();
  }

  selectCategory(slug: string) {
    this.onCardMouseLeave();
    this.market.selectCategory(slug);
  }

}
