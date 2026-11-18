import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { PRODUCTS } from '../../data/mock-data';

interface CommunityReview {
  id: string;
  image: string;
  bubblePosition: 'right' | 'left';
  userName: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
}

const VERIFIED_REVIEWS = PRODUCTS.flatMap(product =>
  product.reviews
    .filter(review => review.verifiedPurchase)
    .map(review => ({ ...review, productName: product.name }))
);

function verifiedReview(id: string, image: string, bubblePosition: CommunityReview['bubblePosition']): CommunityReview {
  const review = VERIFIED_REVIEWS.find(item => item.id === id);
  if (!review) {
    throw new Error(`Verified review not found: ${id}`);
  }
  return { ...review, image, bubblePosition };
}

function sampleReview(
  id: string,
  image: string,
  bubblePosition: CommunityReview['bubblePosition'],
  userName: string,
  city: string,
  state: string,
  productName: string,
  comment: string
): CommunityReview {
  return {
    id,
    image,
    bubblePosition,
    userName,
    city,
    state,
    rating: 5,
    date: 'Illustrative example',
    comment,
    verifiedPurchase: false,
    productName
  };
}

@Component({
  selector: 'app-initiative-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Government Initiatives Showcase -->
    <section class="bg-[#15365B] text-white py-12 sm:py-16" aria-labelledby="initiatives-heading">
      <div class="max-w-[1320px] mx-auto px-4 sm:px-6">
        
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">policy</mat-icon>
            <span>Government of India Schemes</span>
          </div>
          <h2 id="initiatives-heading" class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            Empowering Rural India Through Digital Commerce
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Shreem unites flagship national missions on a single secure public e-marketplace, eliminating commission layers and giving rural producers direct market access.
          </p>
        </div>

        <!-- 4 Major Government Scheme Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">hub</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">One District One Product (ODOP)</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Fosters balanced regional development across all 766 districts of India by unlocking unique indigenous crafts and agrarian specialties.
            </p>
            <div class="text-[11px] text-amber-300 font-semibold pt-1">
              766 Districts Covered
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">groups_3</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">DAY-NRLM (Aajeevika)</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Deendayal Antyodaya Yojana mobilizes over 9.5 crore rural women into Self Help Groups (SHGs) for economic self-reliance and entrepreneurship.
            </p>
            <div class="text-[11px] text-emerald-300 font-semibold pt-1">
              48,000+ Verified SHG Clusters
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">nature_people</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">TRIFED (Tribal Livelihoods)</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Ministry of Tribal Affairs federation protecting forest produce gatherers and tribal bell-metal craftsmen from middlemen exploitation.
            </p>
            <div class="text-[11px] text-sky-300 font-semibold pt-1">
              100% Minimum Support Price Assured
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-400/40 transition-colors space-y-3">
            <div class="w-10 h-10 rounded-xl bg-rose-400/20 text-rose-300 flex items-center justify-center font-bold">
              <mat-icon class="!w-5 !h-5 !text-[20px]">local_shipping</mat-icon>
            </div>
            <h3 class="text-base font-bold text-white">Department of Posts Integration</h3>
            <p class="text-xs text-slate-300 leading-relaxed">
              Dak Ghar Niryat Kendra enables rural post offices to pick up packaged crafts straight from remote villages and deliver across India.
            </p>
            <div class="text-[11px] text-rose-300 font-semibold pt-1">
              19,100+ Pin Codes Connected
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- Community Reviews -->
    <section
      class="relative bg-gradient-to-b from-[#F6FAF7] to-white py-12 sm:py-16"
      aria-labelledby="trust-heading"
      (click)="dismissReview()">
      <div class="mx-auto max-w-[1480px] px-4 sm:px-6">
        <div class="mx-auto mb-7 max-w-2xl text-center sm:mb-9">
          <div class="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#0D5C3A]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#176B45] sm:text-xs">
            <mat-icon class="!h-3.5 !w-3.5 !text-[14px]">groups</mat-icon>
            <span>Community voices</span>
          </div>
          <h3 id="trust-heading" class="text-xl font-black tracking-tight text-[#123B36] sm:text-2xl lg:text-3xl">
            Made with care. Loved at home.
          </h3>
          <p class="mt-1 text-xs leading-relaxed text-[#667085] sm:text-sm">
            Hover or tap a portrait to read the buyer's experience.
          </p>
        </div>

        <div class="relative isolate mx-auto max-w-[1480px] overflow-visible rounded-[36px] border border-[#E7ECE9] bg-white/35 px-3 py-5 backdrop-blur-sm sm:px-6 sm:py-7" aria-label="Community reviews">
          <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[36px]" aria-hidden="true">
            <span class="absolute -left-16 top-6 h-56 w-56 rounded-full bg-[#D8D6E0]/65 blur-3xl"></span>
            <span class="absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[#CDE4D7]/70 blur-3xl"></span>
            <span class="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0E7D7]/55 blur-3xl"></span>
          </div>

          <div class="relative grid grid-cols-2 gap-x-3 gap-y-14 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 xl:grid-cols-5">
            @for (review of communityReviews; track review.id) {
              <article
                class="relative h-[320px] rounded-[26px] border border-white/80 bg-white/35 px-2.5 pt-3 backdrop-blur-sm transition duration-300 hover:bg-white/55 sm:h-[340px] sm:px-3"
                [class.z-50]="activeReview()?.id === review.id"
                [class.blur-sm]="activeReview() !== null && activeReview()?.id !== review.id"
                [class.opacity-50]="activeReview() !== null && activeReview()?.id !== review.id"
                (mouseenter)="showReview(review)"
                (mouseleave)="hideReview(review.id)">
                @if (activeReview()?.id === review.id) {
                  <div
                    id="review-bubble-{{ review.id }}"
                    class="absolute top-3 z-50 w-[calc(100%-24px)] rotate-[-1deg] rounded-[22px] border-[3px] border-[#111] bg-white p-2.5 text-left shadow-[6px_7px_0_#111] sm:rounded-[24px] sm:p-3"
                    [style.left]="review.bubblePosition === 'left' ? '12px' : null"
                    [style.right]="review.bubblePosition === 'right' ? '12px' : null"
                    role="status">
                    <svg class="pointer-events-none absolute -left-3 -top-3 h-7 w-7" viewBox="0 0 40 40" aria-hidden="true">
                      <path d="M35 3 C20 5 9 16 5 31 M39 11 C27 13 19 22 15 34" fill="none" stroke="#111" stroke-linecap="round" stroke-width="1.6" />
                    </svg>
                    <div class="flex items-center justify-between gap-1">
                      <div class="flex shrink-0 text-amber-500" role="img" aria-label="{{ review.rating }} out of 5 stars">
                        @for (star of [1, 2, 3, 4, 5]; track star) {
                          <mat-icon class="!h-3 !w-3 !text-[12px] sm:!h-3.5 sm:!w-3.5 sm:!text-[14px]">{{ star <= review.rating ? 'star' : 'star_outline' }}</mat-icon>
                        }
                      </div>
                      <span
                        class="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold leading-none sm:px-2 sm:text-[9px]"
                        [class.bg-[#ECFDF3]]="review.verifiedPurchase"
                        [class.text-[#176B45]]="review.verifiedPurchase"
                        [class.bg-slate-100]="!review.verifiedPurchase"
                        [class.text-slate-600]="!review.verifiedPurchase">
                        {{ review.verifiedPurchase ? 'Verified purchase' : 'Sample review' }}
                      </span>
                    </div>
                    <blockquote class="mt-1.5 text-[9px] leading-relaxed text-[#344054] sm:mt-2 sm:text-[11px]">
                      “{{ review.comment }}”
                    </blockquote>
                    <div class="mt-1.5 border-t border-slate-100 pt-1.5 sm:mt-2 sm:pt-2">
                      <p class="line-clamp-1 text-[9px] font-bold text-[#15365B] sm:text-[10px]">{{ review.productName }}</p>
                      <p class="mt-0.5 text-[8px] text-[#667085] sm:text-[9px]">{{ review.date }}</p>
                    </div>
                    <svg
                      class="pointer-events-none absolute -bottom-5 h-7 w-8"
                      [class.left-4]="review.bubblePosition === 'left'"
                      [class.right-4]="review.bubblePosition === 'right'"
                      viewBox="0 0 32 30"
                      aria-hidden="true">
                      <path d="M2 1 Q12 8 10 27 L28 4" [attr.transform]="review.bubblePosition === 'right' ? 'translate(32, 0) scale(-1, 1) translate(3, 3)' : 'translate(3, 3)'" fill="#111" stroke="#111" stroke-width="2" stroke-linejoin="round" />
                      <path
                        d="M2 1 Q12 8 10 27 L28 4"
                        [attr.transform]="review.bubblePosition === 'right' ? 'translate(32, 0) scale(-1, 1)' : null"
                        fill="white"
                        stroke="#111"
                        stroke-width="2"
                        stroke-linejoin="round">
                      </path>
                    </svg>
                  </div>
                }

                <span class="pointer-events-none absolute -bottom-4 left-1/2 z-10 h-32 w-32 -translate-x-1/2 rounded-full bg-[#D8D6E0]/85 blur-2xl lg:h-48 lg:w-48" aria-hidden="true"></span>
                <button
                  type="button"
                  class="absolute -bottom-4 left-1/2 z-20 h-[108px] w-[108px] -translate-x-1/2 overflow-hidden rounded-full border-[8px] border-white bg-[#D9D7DE] shadow-[0_14px_32px_rgba(9,43,32,0.24)] ring-2 ring-[#B9BBC4] transition duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(9,43,32,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0D5C3A] sm:h-[136px] sm:w-[136px] lg:h-[160px] lg:w-[160px]"
                  [class.z-30]="activeReview()?.id === review.id"
                  [attr.aria-label]="'Read review from ' + review.userName"
                  [attr.aria-expanded]="activeReview()?.id === review.id"
                  [attr.aria-describedby]="activeReview()?.id === review.id ? 'review-bubble-' + review.id : null"
                  (focus)="showReview(review)"
                  (blur)="hideReview(review.id)"
                  (click)="showReview(review); $event.stopPropagation()">
                  <img [src]="review.image" alt="" class="h-full w-full scale-110 object-cover object-top" loading="lazy" />
                </button>
                <div class="absolute -bottom-12 left-1/2 z-20 w-[calc(100%-12px)] -translate-x-1/2 text-center">
                  <p class="truncate text-[10px] font-bold text-[#15365B] sm:text-xs">{{ review.userName }}</p>
                  <p class="truncate text-[8px] text-[#667085] sm:text-[10px]">{{ review.city }}, {{ review.state }}</p>
                </div>
              </article>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Citizen Newsletter Subscription -->
    <section class="max-w-[1320px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      <div class="bg-gradient-to-r from-[#15365B] to-[#176B45] text-white p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div class="space-y-1 text-center md:text-left max-w-lg">
          <h3 class="text-xl sm:text-2xl font-black">Stay Connected with Indian Heritage</h3>
          <p class="text-xs sm:text-sm text-slate-200">
            Receive monthly updates on newly onboarded artisan clusters, ODOP exhibitions, and seasonal harvests.
          </p>
        </div>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email address..."
            class="px-4 py-2.5 text-xs bg-white text-[#1D2939] rounded-lg focus:outline-none w-full sm:w-72"
          />
          <button
            type="button"
            (click)="onSubscribe()"
            class="px-5 py-2.5 bg-[#D99A32] hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  `
})
export class InitiativeSection {
  readonly market = inject(MarketplaceService);
  readonly activeReview = signal<CommunityReview | null>(null);
  readonly communityReviews: CommunityReview[] = [
    verifiedReview('rev-01', '/assets/images/T1.jpg', 'left'),
    verifiedReview('rev-02', '/assets/images/T2.jpg', 'right'),
    verifiedReview('rev-04', '/assets/images/T3.jpg', 'left'),
    verifiedReview('rev-06', '/assets/images/T4.jpg', 'right'),
    sampleReview(
      'sample-01',
      '/assets/images/T5.jpg',
      'left',
      'Naina Kapoor',
      'Jaipur',
      'Rajasthan',
      'Hand-painted Blue Pottery Vase',
      'The blue floral finish adds a lovely handmade touch to my entryway.'
    ),
    verifiedReview('rev-03', '/assets/images/T6.jpg', 'left'),
    verifiedReview('rev-05', '/assets/images/T7.jpg', 'right'),
    sampleReview(
      'sample-02',
      '/assets/images/T8.jpg',
      'left',
      'Aarav Menon',
      'Bengaluru',
      'Karnataka',
      'Bastar Dhokra Brass Elephant',
      'The fine metal details and warm finish make this a memorable piece for our home.'
    ),
    sampleReview(
      'sample-03',
      '/assets/images/T9.jpg',
      'right',
      'Kabir Joshi',
      'Mumbai',
      'Maharashtra',
      'Handwoven Chanderi Stole',
      'Lightweight, beautifully woven, and easy to pair with festive outfits.'
    ),
    sampleReview(
      'sample-04',
      '/assets/images/T10.jpg',
      'left',
      'Ishaan Bhatt',
      'Ahmedabad',
      'Gujarat',
      'Handmade Artisanal Home Decor',
      'The colours are cheerful and the finishing feels thoughtful and personal.'
    )
  ];

  onSubscribe() {
    this.market.showToast('Subscribed to Shreem official updates!', 'success');
  }

  showReview(review: CommunityReview) {
    this.activeReview.set(review);
  }

  hideReview(id: string) {
    if (this.activeReview()?.id === id) {
      this.dismissReview();
    }
  }

  dismissReview() {
    this.activeReview.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.dismissReview();
  }

}
