import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MarketplaceService } from '../../services/marketplace.service';

@Component({
  selector: 'app-trust-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="relative overflow-hidden bg-[#073F30] text-[#F2F1DF] pb-24 text-xs md:pb-0">
      <section class="relative isolate min-h-[400px] overflow-hidden bg-[#087553] sm:min-h-[430px]" aria-labelledby="footer-newsletter-title">
        <svg
          class="pointer-events-none absolute inset-x-0 top-0 h-[280px] w-full opacity-75 sm:h-[320px]"
          viewBox="0 0 1600 340"
          preserveAspectRatio="xMidYMin slice"
          fill="none"
          aria-hidden="true">
          <defs>
            <pattern id="footer-tree-canopy" width="42" height="48" patternUnits="userSpaceOnUse">
              <path d="M21 0 12 18h6L8 32h10L11 46h20L24 32h10L24 18h6z" fill="#E8EDCF" />
            </pattern>
            <g id="footer-village" stroke="#E8EDCF" stroke-linecap="round" stroke-linejoin="round">
              <path d="M-20 240 43 171l38 31 66-101 45 67 34-28 79 100" stroke-width="3" />
              <path d="m43 171 19 10-13 3 19 13-21-3 15 13M147 101l20 31-13-5 18 27-21-13 12 20M192 168l17 8-13 3 20 15" stroke-width="1.5" />
              <path d="M0 235c42-13 74-11 110 0s72 14 112 0 67-14 102 0M-8 255c44-12 77-11 116 1s74 13 113 0 68-13 102 0M20 276c34-9 62-8 92 1s58 10 88 0 53-10 82 0" stroke-width="2" />
              <path d="M35 221V195l34-20 34 20v26M28 195l41-24 41 24M53 221v-16h13v16M83 205h8v8h-8z" stroke-width="2.5" />
              <path d="M233 228v-20l24-14 25 14v20m-54-20 29-17 30 17m-39 20v-12h11v12" stroke-width="2" />
              <path d="M8 220v-16l-8-12-8 12v16m8-28v28m5-18H-5M305 224v-20l-9-13-9 13v20m9-33v33m6-20h-12" stroke-width="2" />
              <path d="m117 230 8-18 8 18m-8-18v20m-9-13h18m103 12 8-18 8 18m-8-18v20m-9-13h18" stroke-width="2" />
            </g>
          </defs>
          <rect width="1600" height="48" fill="url(#footer-tree-canopy)" />
          <use href="#footer-village" />
          <use href="#footer-village" transform="translate(1600 0) scale(-1 1)" />
        </svg>

        <div class="relative z-10 mx-auto flex min-h-[400px] max-w-[1320px] items-center justify-center px-4 pb-10 pt-24 text-center sm:min-h-[430px] sm:px-6 sm:pt-28">
          <div class="w-full max-w-xl">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8EDCF] backdrop-blur-sm">
              <mat-icon class="!h-3.5 !w-3.5 !text-[14px]">eco</mat-icon>
              Notes from the makers
            </span>
            <h2 id="footer-newsletter-title" class="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Stay close to the craft.
            </h2>
            <p class="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">
              New finds, maker stories and little moments from across India — delivered thoughtfully.
            </p>

            <form (submit)="onSubscribe($event)" class="mx-auto mt-6 flex max-w-md items-center gap-1.5 rounded-full bg-[#F9F8EE] p-1.5 pl-4 shadow-[0_12px_30px_rgba(0,35,23,0.2)]">
              <mat-icon class="!h-4 !w-4 !text-[16px] text-[#63806D]">mail_outline</mat-icon>
              <input
                type="email"
                required
                aria-label="Email address for newsletter"
                placeholder="Your email address"
                class="min-w-0 flex-1 bg-transparent py-2 text-xs text-[#1E3D2D] outline-none placeholder:text-[#8A988B]"
              />
              <button
                type="submit"
                class="shrink-0 rounded-full bg-[#102D22] px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#244A36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5">
                Subscribe
              </button>
            </form>
            <p class="mt-2 text-[10px] text-white/55">A thoughtful note now and then. Unsubscribe whenever you like.</p>
          </div>
        </div>
      </section>

      <div class="relative border-t border-white/10 bg-[#073F30]">
        <div class="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true">
          <svg class="h-full w-full" viewBox="0 0 1600 520" preserveAspectRatio="none" fill="none">
            <path d="M0 100c260 100 380-100 650 10s390 70 570-8 280-55 380 0M0 150c260 100 380-100 650 10s390 70 570-8 280-55 380 0" stroke="#D8E9AC" stroke-width="1" />
          </svg>
        </div>

        <div class="relative mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12">
          <div class="grid gap-x-8 gap-y-10 border-b border-white/15 pb-9 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.95fr_1fr_220px] lg:gap-8">
            <div class="space-y-4">
              <div class="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D8E9AC]">
                <span class="h-px w-7 bg-[#D8E9AC]"></span>
                Made by many hands
              </div>
              <h3 class="max-w-[260px] font-serif text-2xl font-semibold leading-tight text-white">
                Every piece carries a place with it.
              </h3>
              <p class="max-w-xs text-xs leading-relaxed text-white/65">
                Discover thoughtful work from India's artisan communities, made slowly and shared directly.
              </p>
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-semibold text-white/75">GI certified</span>
                <span class="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-semibold text-white/75">Direct to makers</span>
                <span class="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-semibold text-white/75">ODOP · DAY-NRLM</span>
              </div>
            </div>

            <nav aria-label="Explore marketplace" class="space-y-3">
              <h4 class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#D8E9AC]">Explore</h4>
              <ul class="space-y-2.5 text-white/70">
                <li><button type="button" (click)="market.setView('catalogue')" class="transition-colors hover:text-white">All products</button></li>
                <li><button type="button" (click)="market.selectCategory('handloom-textiles')" class="transition-colors hover:text-white">Handloom &amp; textiles</button></li>
                <li><button type="button" (click)="market.selectCategory('tribal-metalcraft')" class="transition-colors hover:text-white">Tribal &amp; brass crafts</button></li>
                <li><button type="button" (click)="market.selectCategory('organic-food')" class="transition-colors hover:text-white">Forest produce</button></li>
                <li><button type="button" (click)="market.setView('sellers')" class="transition-colors hover:text-white">Meet the makers</button></li>
              </ul>
            </nav>

            <nav aria-label="Customer support" class="space-y-3">
              <h4 class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#D8E9AC]">Need a hand?</h4>
              <ul class="space-y-2.5 text-white/70">
                <li><button type="button" (click)="market.openAccount('orders')" class="transition-colors hover:text-white">Track an order</button></li>
                <li><button type="button" (click)="openHelp()" class="transition-colors hover:text-white">Shipping &amp; dispatch</button></li>
                <li><button type="button" (click)="openHelp()" class="transition-colors hover:text-white">Returns &amp; replacements</button></li>
                <li><button type="button" (click)="market.openAccount('grievance')" class="transition-colors hover:text-white">Raise a grievance</button></li>
                <li><span class="inline-block pt-1 font-semibold text-[#D8E9AC]">Artisan helpline: 1800-11-2026</span></li>
              </ul>
            </nav>

            <div class="space-y-3">
              <h4 class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#D8E9AC]">Trust &amp; care</h4>
              <ul class="space-y-2.5 text-white/70">
                <li><span>National GI Registry</span></li>
                <li><span>Silk Mark certification</span></li>
                <li><span>FSSAI organic standards</span></li>
                <li><span>Accessibility standards</span></li>
                <li><span>Terms &amp; conditions</span></li>
              </ul>
              <div class="flex flex-wrap gap-x-3 gap-y-1.5 pt-1 text-[10px] font-semibold text-white/50">
                <span class="inline-flex items-center gap-1"><mat-icon class="!h-3.5 !w-3.5 !text-[14px] text-[#D8E9AC]">verified</mat-icon>Direct DBT</span>
                <span class="inline-flex items-center gap-1"><mat-icon class="!h-3.5 !w-3.5 !text-[14px] text-[#D8E9AC]">markunread_mailbox</mat-icon>India Post</span>
              </div>
            </div>

            <div class="relative min-h-[270px] overflow-hidden rounded-[28px] border border-[#D8E9AC]/55 bg-[#153E2E] shadow-[0_16px_38px_rgba(0,0,0,0.2)] sm:row-span-2 lg:row-span-1">
              <img
                src="/assets/images/HERO.png"
                alt=""
                loading="lazy"
                class="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-700 hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#06291E] via-[#06291E]/35 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-5">
                <span class="inline-flex items-center gap-1 rounded-full bg-[#D8E9AC] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#20482F]">
                  <mat-icon class="!h-3 !w-3 !text-[12px]">explore</mat-icon>
                  The Shreem edit
                </span>
                <h4 class="mt-3 font-serif text-xl font-semibold leading-tight text-white">
                  Find the story behind every piece.
                </h4>
                <button
                  type="button"
                  (click)="market.setView('catalogue')"
                  class="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F7F5E9] px-4 py-2 text-[10px] font-extrabold text-[#17422E] transition-colors hover:bg-[#D8E9AC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Explore the collection
                  <mat-icon class="!h-3.5 !w-3.5 !text-[14px]">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center justify-between gap-4 pt-6 text-center text-[10px] text-white/45 sm:flex-row sm:text-left">
            <p>© {{ currentYear }} Shreem · Ministry of Rural Development, Government of India. All rights reserved.</p>
            <p class="flex items-center gap-1.5">
              <mat-icon class="!h-3.5 !w-3.5 !text-[14px] text-[#D8E9AC]">favorite</mat-icon>
              A marketplace rooted in craft, carried by community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class TrustFooter {
  readonly market = inject(MarketplaceService);
  readonly currentYear = new Date().getFullYear();

  onSubscribe(event: Event) {
    event.preventDefault();
    this.market.showToast('Subscribed to Shreem official updates!', 'success');
  }

  openHelp() {
    this.market.showToast('Official Shreem Shipping & Returns Policy: All fragile crafts insured by India Post Speed Post with 7-day replacement.', 'info');
  }
}
