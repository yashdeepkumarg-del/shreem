import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

interface CarouselSlide {
  id: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleAccentColor: string;
  description: string;
  primaryCtaText: string;
  primaryCtaIcon: string;
  primaryAction: () => void;
  secondaryCtaText: string;
  secondaryCtaIcon: string;
  secondaryAction: () => void;
  image: string;
  imageAlt: string;
  tagText: string;
  tagIcon: string;
}

@Component({
  selector: 'app-hero-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section
      class="group/carousel relative isolate min-h-[440px] overflow-hidden bg-[#00483f] sm:min-h-[500px] lg:h-[436px] lg:min-h-0 select-none"
      aria-label="Featured Indian handicrafts carousel"
      (mouseenter)="isPaused.set(true)"
      (mouseleave)="isPaused.set(false)"
      tabindex="0"
      (keydown.arrowleft)="prevSlide()"
      (keydown.arrowright)="nextSlide()">

      <!-- ======================================================== -->
      <!-- 2. SLIDES CONTAINER                                      -->
      <!-- ======================================================== -->
      @for (slide of slides; track slide.id; let idx = $index) {
        <div
          class="absolute inset-0 transition-opacity duration-700 ease-in-out"
          [class.opacity-100]="activeIndex() === idx"
          [class.opacity-0]="activeIndex() !== idx"
          [class.pointer-events-none]="activeIndex() !== idx"
          [attr.aria-hidden]="activeIndex() !== idx">

          <!-- Right-side image with desktop angled mask -->
          <img
            [src]="slide.image"
            [alt]="slide.imageAlt"
            class="absolute inset-0 h-full w-full object-cover object-[64%_54%] lg:inset-y-0 lg:left-[31%] lg:right-0 lg:w-[69%] lg:object-center"
          />

          <!-- Mobile / Tablet dark fade overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#00483f] via-[#00483f]/95 to-[#00483f]/60 lg:hidden"></div>

          <!-- Desktop left-panel texture and divider; the right-side image remains unchanged -->
          <div class="absolute inset-0 hidden lg:block" aria-hidden="true">
            <svg class="h-full w-full" viewBox="0 0 1729 436" preserveAspectRatio="none">
              <defs>
                <clipPath id="hero-left-panel-clip">
                  <path d="M0 0H930C861 84 817 178 811 261C806 332 819 389 840 436H0Z"></path>
                </clipPath>
                <pattern id="hero-left-panel-texture" width="18" height="18" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#d7a831" opacity=".18"></circle>
                </pattern>
              </defs>
              <path d="M0 0H930C861 84 817 178 811 261C806 332 819 389 840 436H0Z" fill="#00483f"></path>
              <path d="M930 0C861 84 817 178 811 261C806 332 819 389 840 436" fill="none" stroke="#f8bd00" stroke-width="8"></path>
              <g clip-path="url(#hero-left-panel-clip)">
                <path d="M0 0H930C861 84 817 178 811 261C806 332 819 389 840 436H0Z" fill="url(#hero-left-panel-texture)"></path>
                <path d="M0 0H145L0 110Z" fill="#f8bd00" opacity=".12"></path>
                <path d="M0 15C40 22 58 67 0 87M0 28C28 35 40 62 0 74M690 0C720 36 730 77 709 111M715 0C745 29 759 57 754 88" fill="none" stroke="#d7a831" stroke-width="2" opacity=".45"></path>
                <g fill="none" stroke="#d7a831" stroke-width="1.5" opacity=".48">
                  <path d="M0 28C24 39 34 57 32 80C30 103 16 118 0 124M0 42C16 50 22 63 21 80C20 96 10 106 0 111"></path>
                  <path d="M744 347C763 359 775 377 778 400M758 337C780 353 793 373 796 398M730 362C750 374 761 390 763 411"></path>
                  <path d="M762 379C747 370 743 360 748 351C758 354 766 362 768 374C770 359 778 350 789 348C794 359 789 370 775 380C789 377 800 382 805 392C796 401 783 400 773 389C779 401 776 412 767 419C757 412 755 400 762 389C751 397 739 396 731 388C736 378 748 375 762 379Z"></path>
                </g>
              </g>
            </svg>
          </div>

          <!-- Slide Content Overlaid on Left -->
          <div class="relative z-10 mx-auto flex min-h-[440px] max-w-[1600px] items-center px-4 py-8 sm:min-h-[500px] sm:px-8 lg:h-full lg:min-h-0 lg:px-16 lg:py-8">
            <div class="max-w-[700px] text-left text-white lg:w-[50%]">
              <div class="mb-3 flex h-7 w-16 items-center justify-center text-[#d7a831]" aria-hidden="true">
                <svg viewBox="0 0 64 28" class="h-full w-full" fill="none">
                  <path d="M3 14h17m24 0h17M20 14l4-2m16 2-4-2" stroke="currentColor" stroke-width="1"></path>
                  <path d="M32 4c-4 4-5 7-5 10 3-1 5-3 5-6 0 3 2 5 5 6 0-3-1-6-5-10ZM24 15c2-2 5-2 8-1 3-1 6-1 8 1-2 4-5 6-8 6s-6-2-8-6Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path>
                  <path d="M29 22h6" stroke="currentColor" stroke-width="1"></path>
                </svg>
              </div>

              <!-- Kicker Badge -->
              <div class="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[.16em] text-white/90 sm:text-xs">
                <span>{{ slide.badge }}</span>
              </div>

              <!-- Main Heading -->
              <h1 class="text-[2rem] font-black leading-[1.06] tracking-tight max-[300px]:text-[1.75rem] min-[360px]:text-[2.35rem] sm:text-5xl lg:text-[3.25rem]">
                <span class="block">{{ slide.titleLine1 }}</span>
                <span class="block" [style.color]="slide.titleAccentColor">{{ slide.titleLine2 }}</span>
              </h1>

              <!-- Description -->
              <p class="mt-3 max-w-[540px] text-[13px] leading-[1.45] text-white/90 sm:mt-3.5 sm:text-sm sm:leading-relaxed">
                {{ slide.description }}
              </p>

              <!-- CTAs & Floating Tag -->
              <div class="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                <button
                  type="button"
                  (click)="slide.primaryAction()"
                  class="group inline-flex items-center gap-1.5 rounded-full bg-[#ffc400] px-4 py-2 text-xs font-extrabold text-[#063e35] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#ffce24] cursor-pointer whitespace-nowrap sm:gap-2 sm:px-5 sm:py-2.5">
                  <mat-icon class="!h-4 !w-4 !text-[18px] sm:!h-5 sm:!w-5 sm:!text-[20px]">{{ slide.primaryCtaIcon }}</mat-icon>
                  <span class="whitespace-nowrap">{{ slide.primaryCtaText }}</span>
                  <mat-icon class="!h-4 !w-4 !text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</mat-icon>
                </button>

                <button
                  type="button"
                  (click)="slide.secondaryAction()"
                  class="group inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-extrabold text-white shadow-md backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20 cursor-pointer whitespace-nowrap sm:gap-2 sm:px-5 sm:py-2.5">
                  <mat-icon class="!h-4 !w-4 !text-[16px]">{{ slide.secondaryCtaIcon }}</mat-icon>
                  <span class="whitespace-nowrap">{{ slide.secondaryCtaText }}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      }

      <!-- ======================================================== -->
      <!-- 3. CAROUSEL NAVIGATION CONTROLS                          -->
      <!-- ======================================================== -->
      @if (slides.length > 1) {
        <!-- Previous Slide Arrow Button -->
        <button
          type="button"
          (click)="prevSlide()"
          class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 hidden h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer sm:flex sm:h-12 sm:w-12 sm:hover:bg-[#00332c]"
          aria-label="Previous slide">
          <mat-icon class="!h-5 !w-5 sm:!h-6 sm:!w-6 !text-[22px] sm:!text-[26px]">chevron_left</mat-icon>
        </button>

        <!-- Next Slide Arrow Button -->
        <button
          type="button"
          (click)="nextSlide()"
          class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 hidden h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer sm:flex sm:h-12 sm:w-12 sm:hover:bg-[#00332c]"
          aria-label="Next slide">
          <mat-icon class="!h-5 !w-5 sm:!h-6 sm:!w-6 !text-[22px] sm:!text-[26px]">chevron_right</mat-icon>
        </button>

        <!-- Bottom Slide Indicators / Dots -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/30 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
          @for (slide of slides; track slide.id; let idx = $index) {
            <button
              type="button"
              (click)="goToSlide(idx)"
              class="relative transition-all duration-300 rounded-full cursor-pointer overflow-hidden"
              [class.w-7]="activeIndex() === idx"
              [class.h-2]="activeIndex() === idx"
              [class.bg-[#ffc400]]="activeIndex() === idx"
              [class.w-2]="activeIndex() !== idx"
              [class.h-2]="activeIndex() !== idx"
              [class.bg-white/45]="activeIndex() !== idx"
              [attr.aria-label]="'Go to slide ' + (idx + 1)"
              [attr.aria-current]="activeIndex() === idx ? 'true' : 'false'">
            </button>
          }
        </div>
      }

    </section>
  `
})
export class HeroCarousel implements OnInit, OnDestroy {
  readonly market = inject(MarketplaceService);

  readonly activeIndex = signal<number>(0);
  readonly isPaused = signal<boolean>(false);
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  readonly slides: CarouselSlide[] = [
    {
      id: 'slide-treasures',
      badge: 'TRADITIONAL • SUSTAINABLE • HANDMADE',
      titleLine1: 'Discover India’s',
      titleLine2: 'Handcrafted Treasures',
      titleAccentColor: '#ffc400',
      description: 'A curated collection of handmade art, décor, and everyday essentials by skilled Indian artisans, with a story in every piece.',
      primaryCtaText: 'Shop Now',
      primaryCtaIcon: 'shopping_bag',
      primaryAction: () => this.market.setView('catalogue'),
      secondaryCtaText: 'Explore Artisans',
      secondaryCtaIcon: 'eco',
      secondaryAction: () => this.market.setView('sellers'),
      image: '/assets/images/HERO.png',
      imageAlt: 'Handcrafted Indian pottery, woven baskets, brass decor and textiles',
      tagText: 'Certified GI Regional Crafts',
      tagIcon: 'verified'
    },
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    if (this.slides.length > 1 && typeof window !== 'undefined') {
      this.autoPlayTimer = setInterval(() => {
        if (!this.isPaused()) {
          this.nextSlide();
        }
      }, 5500);
    }
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  nextSlide() {
    this.activeIndex.update(curr => (curr + 1) % this.slides.length);
  }

  prevSlide() {
    this.activeIndex.update(curr => (curr - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index: number) {
    this.activeIndex.set(index);
  }
}
