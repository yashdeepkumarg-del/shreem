import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, FormsModule],
  template: `
    @if (market.isSupportModalOpen()) {
      <div
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        (click)="close()"
        (keydown.escape)="close()">

        <div
          role="document"
          tabindex="0"
          class="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#e4e8f0] overflow-hidden animate-in zoom-in-95 duration-200"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()">

          <!-- Header -->
          <div class="px-6 py-4.5 bg-gradient-to-r from-[#0d5c3a] via-[#116e47] to-[#15365B] text-white flex items-center justify-between shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-xs">
                <mat-icon class="!w-5 !h-5 !text-[22px] text-[#ffd166]">support_agent</mat-icon>
              </div>
              <div>
                <h2 class="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                  <span>Help & Citizen Support Center</span>
                  <span class="text-[10px] font-bold bg-[#ffd166] text-[#0d5c3a] px-2 py-0.5 rounded-full uppercase tracking-wider">Official</span>
                </h2>
                <p class="text-xs text-white/80">
                  Certified Artisan Direct Marketplace · Ministry of Rural Development & Tribal Affairs
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="close()"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog">
              <mat-icon class="!w-5 !h-5 !text-[20px]">close</mat-icon>
            </button>
          </div>

          <!-- Tab Bar -->
          <div class="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-[#e7ebf2] bg-[#f9fafc] overflow-x-auto text-xs font-bold shrink-0">
            <button
              type="button"
              (click)="setTab('faqs')"
              [class.text-[#0d5c3a]]="market.activeSupportTab() === 'faqs'"
              [class.border-[#0d5c3a]]="market.activeSupportTab() === 'faqs'"
              [class.bg-white]="market.activeSupportTab() === 'faqs'"
              class="px-3.5 py-2.5 rounded-t-xl border-b-2 border-transparent transition-all flex items-center gap-1.5 cursor-pointer text-[#475467] hover:text-[#0d5c3a]">
              <mat-icon class="!w-4 !h-4 !text-[16px]">quiz</mat-icon>
              <span>FAQs</span>
            </button>

            <button
              type="button"
              (click)="setTab('returns')"
              [class.text-[#0d5c3a]]="market.activeSupportTab() === 'returns'"
              [class.border-[#0d5c3a]]="market.activeSupportTab() === 'returns'"
              [class.bg-white]="market.activeSupportTab() === 'returns'"
              class="px-3.5 py-2.5 rounded-t-xl border-b-2 border-transparent transition-all flex items-center gap-1.5 cursor-pointer text-[#475467] hover:text-[#0d5c3a]">
              <mat-icon class="!w-4 !h-4 !text-[16px]">assignment_return</mat-icon>
              <span>Returns & Refunds</span>
            </button>

            <button
              type="button"
              (click)="setTab('cancellation')"
              [class.text-[#0d5c3a]]="market.activeSupportTab() === 'cancellation'"
              [class.border-[#0d5c3a]]="market.activeSupportTab() === 'cancellation'"
              [class.bg-white]="market.activeSupportTab() === 'cancellation'"
              class="px-3.5 py-2.5 rounded-t-xl border-b-2 border-transparent transition-all flex items-center gap-1.5 cursor-pointer text-[#475467] hover:text-[#0d5c3a]">
              <mat-icon class="!w-4 !h-4 !text-[16px]">cancel</mat-icon>
              <span>Cancellation Policy</span>
            </button>

            <button
              type="button"
              (click)="setTab('track')"
              [class.text-[#0d5c3a]]="market.activeSupportTab() === 'track'"
              [class.border-[#0d5c3a]]="market.activeSupportTab() === 'track'"
              [class.bg-white]="market.activeSupportTab() === 'track'"
              class="px-3.5 py-2.5 rounded-t-xl border-b-2 border-transparent transition-all flex items-center gap-1.5 cursor-pointer text-[#475467] hover:text-[#0d5c3a]">
              <mat-icon class="!w-4 !h-4 !text-[16px]">local_shipping</mat-icon>
              <span>Track Order</span>
            </button>

            <button
              type="button"
              (click)="setTab('contact')"
              [class.text-[#0d5c3a]]="market.activeSupportTab() === 'contact'"
              [class.border-[#0d5c3a]]="market.activeSupportTab() === 'contact'"
              [class.bg-white]="market.activeSupportTab() === 'contact'"
              class="px-3.5 py-2.5 rounded-t-xl border-b-2 border-transparent transition-all flex items-center gap-1.5 cursor-pointer text-[#475467] hover:text-[#0d5c3a]">
              <mat-icon class="!w-4 !h-4 !text-[16px]">mail</mat-icon>
              <span>Contact Us</span>
            </button>
          </div>

          <!-- Body Content Area -->
          <div class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">

            <!-- TAB: FAQS -->
            @if (market.activeSupportTab() === 'faqs') {
              <div class="space-y-4">
                <div class="border-b border-slate-100 pb-3">
                  <h3 class="text-base font-black text-[#15365B]">Frequently Asked Questions</h3>
                  <p class="text-xs text-[#667085] mt-0.5">Everything you need to know about purchasing authentic handmade crafts.</p>
                </div>

                <div class="space-y-3">
                  @for (faq of faqs(); track faq.q) {
                    <div class="p-4 rounded-2xl border border-[#e4e9f2] bg-[#fafbfc] hover:border-[#0d5c3a]/40 transition-colors">
                      <div class="flex items-start gap-2.5">
                        <mat-icon class="!w-4 !h-4 !text-[18px] text-[#0d5c3a] shrink-0 mt-0.5">help</mat-icon>
                        <div>
                          <h4 class="text-xs sm:text-sm font-bold text-[#15365B]">{{ faq.q }}</h4>
                          <p class="text-xs text-[#475467] mt-1.5 leading-relaxed">{{ faq.a }}</p>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- TAB: RETURNS & REFUNDS -->
            @if (market.activeSupportTab() === 'returns') {
              <div class="space-y-5">
                <div class="border-b border-slate-100 pb-3">
                  <h3 class="text-base font-black text-[#15365B]">7-Day Hassle-Free Returns & Escrow Refund</h3>
                  <p class="text-xs text-[#667085] mt-0.5">Guaranteed protection for delicate handicrafts and heritage handlooms.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <mat-icon class="!w-6 !h-6 !text-[24px] text-[#0d5c3a]">verified_user</mat-icon>
                    <div class="font-bold text-xs text-[#0d5c3a] mt-2">7 Days Window</div>
                    <div class="text-[11px] text-[#475467] mt-1">Free return request within 7 calendar days of delivery.</div>
                  </div>
                  <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                    <mat-icon class="!w-6 !h-6 !text-[24px] text-[#15365B]">local_shipping</mat-icon>
                    <div class="font-bold text-xs text-[#15365B] mt-2">Free India Post Pickup</div>
                    <div class="text-[11px] text-[#475467] mt-1">India Post Speed Post executive picks up from your doorstep.</div>
                  </div>
                  <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <mat-icon class="!w-6 !h-6 !text-[24px] text-[#b45309]">payments</mat-icon>
                    <div class="font-bold text-xs text-[#b45309] mt-2">Instant UPI Escrow</div>
                    <div class="text-[11px] text-[#475467] mt-1">100% money reversed to original UPI/Card account within 24h.</div>
                  </div>
                </div>

                <div class="p-4 rounded-2xl bg-[#faf8f3] border border-[#e5dec9] text-xs text-[#594d36] space-y-2">
                  <div class="font-bold text-sm text-[#3b321e]">How do I request a return or replacement?</div>
                  <p class="leading-relaxed">
                    1. Go to <strong>My Account &gt; Orders &amp; Tracking</strong>.<br/>
                    2. Select the order item and click <strong>Request Return / Replacement</strong>.<br/>
                    3. Upload a quick photo if damaged in transit. Our artisan cluster manager will immediately dispatch a fresh piece or initiate your full escrow refund.
                  </p>
                </div>

                <div class="flex justify-end">
                  <button
                    type="button"
                    (click)="goToOrders()"
                    class="px-5 py-2.5 bg-[#0d5c3a] hover:bg-[#084229] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm">
                    <span>Go to My Orders to Return Item</span>
                    <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
                  </button>
                </div>
              </div>
            }

            <!-- TAB: CANCELLATION POLICY -->
            @if (market.activeSupportTab() === 'cancellation') {
              <div class="space-y-4">
                <div class="border-b border-slate-100 pb-3">
                  <h3 class="text-base font-black text-[#15365B]">Order Cancellation Guidelines</h3>
                  <p class="text-xs text-[#667085] mt-0.5">Simple, transparent, zero-penalty cancellation before cluster dispatch.</p>
                </div>

                <div class="space-y-3 text-xs text-[#475467]">
                  <div class="p-4 rounded-2xl border border-slate-200 bg-white">
                    <span class="font-bold text-[#15365B]">1. Prior to Speed Post Handover:</span>
                    <p class="mt-1 leading-relaxed">
                      You can cancel your order anytime before the weaver or craft cluster hands over the parcel to the India Post Speed Post center. Zero cancellation fees apply.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl border border-slate-200 bg-white">
                    <span class="font-bold text-[#15365B]">2. Post Dispatch:</span>
                    <p class="mt-1 leading-relaxed">
                      If the parcel is already in transit, simply refuse delivery upon arrival or use the 7-day doorstep return option once received.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl border border-slate-200 bg-white">
                    <span class="font-bold text-[#15365B]">3. Refund Speed:</span>
                    <p class="mt-1 leading-relaxed">
                      BHIM UPI payments are refunded instantly. Debit/Credit Card refunds reflect within 2 to 4 business days per RBI clearing standards.
                    </p>
                  </div>
                </div>
              </div>
            }

            <!-- TAB: TRACK ORDER -->
            @if (market.activeSupportTab() === 'track') {
              <div class="space-y-5">
                <div class="border-b border-slate-100 pb-3">
                  <h3 class="text-base font-black text-[#15365B]">Track Your Speed Post Consignment</h3>
                  <p class="text-xs text-[#667085] mt-0.5">Real-time GPS updates from rural cluster hub to your doorstep.</p>
                </div>

                <div class="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    [(ngModel)]="trackingInput"
                    placeholder="Enter Speed Post Consignment (e.g. SP-IN-2024-8491)"
                    class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#0d5c3a] focus:ring-1 focus:ring-[#0d5c3a]"
                  />
                  <button
                    type="button"
                    (click)="searchConsignment()"
                    class="px-6 py-2.5 bg-[#0d5c3a] hover:bg-[#07472d] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <mat-icon class="!w-4 !h-4 !text-[16px]">search</mat-icon>
                    <span>Track Live</span>
                  </button>
                </div>

                <div class="p-4 rounded-2xl bg-[#f4f7f6] border border-[#dce7e3] flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-[#0d5c3a]">Active Orders in Your Account</div>
                    <div class="text-[11px] text-[#667085] mt-0.5">{{ market.orders().length }} items currently in dispatch pipeline.</div>
                  </div>
                  <button
                    type="button"
                    (click)="goToOrders()"
                    class="px-4 py-2 bg-white text-[#15365B] font-bold text-xs rounded-lg border border-slate-200 hover:border-[#0d5c3a] transition-colors cursor-pointer">
                    View in Citizen Portal
                  </button>
                </div>
              </div>
            }

            <!-- TAB: CONTACT US -->
            @if (market.activeSupportTab() === 'contact') {
              <div class="space-y-5">
                <div class="border-b border-slate-100 pb-3">
                  <h3 class="text-base font-black text-[#15365B]">Contact Citizen Helpdesk & Grievance Desk</h3>
                  <p class="text-xs text-[#667085] mt-0.5">We are here to assist with artisan inquiries, bulk orders, and queries.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="p-4 rounded-2xl border border-slate-200 bg-[#f8f9fa] space-y-2">
                    <div class="flex items-center gap-2 text-xs font-bold text-[#0d5c3a]">
                      <mat-icon class="!w-4 !h-4 !text-[18px]">call</mat-icon>
                      <span>National Toll-Free Helpline</span>
                    </div>
                    <div class="text-lg font-black text-[#15365B]">1800-11-SHILP (7445)</div>
                    <div class="text-[11px] text-[#667085]">Mon - Sat: 9:00 AM to 6:00 PM IST</div>
                  </div>

                  <div class="p-4 rounded-2xl border border-slate-200 bg-[#f8f9fa] space-y-2">
                    <div class="flex items-center gap-2 text-xs font-bold text-[#15365B]">
                      <mat-icon class="!w-4 !h-4 !text-[18px]">email</mat-icon>
                      <span>Official Support Email</span>
                    </div>
                    <div class="text-base font-black text-[#15365B]">support&#64;bharatshilp.gov.in</div>
                    <div class="text-[11px] text-[#667085]">Average response time: &lt; 2 business hours</div>
                  </div>
                </div>

                <!-- Quick Message Form -->
                <div class="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <div class="text-xs font-bold text-[#15365B]">Send a Message to Cluster Coordinator</div>
                  <input
                    type="text"
                    [(ngModel)]="contactSubject"
                    placeholder="Subject (e.g. Inquiry regarding Chanderi Saree dispatch)"
                    class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c3a]"
                  />
                  <textarea
                    [(ngModel)]="contactMessage"
                    rows="3"
                    placeholder="Type your message or inquiry here..."
                    class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0d5c3a]"
                  ></textarea>
                  <div class="flex justify-between items-center pt-1">
                    <button
                      type="button"
                      (click)="goToGrievance()"
                      class="text-xs font-bold text-[#0d5c3a] hover:underline flex items-center gap-1 cursor-pointer">
                      <mat-icon class="!w-3.5 !h-3.5 !text-[15px]">gavel</mat-icon>
                      <span>CPGRAMS Official Grievance Portal</span>
                    </button>
                    <button
                      type="button"
                      (click)="submitInquiry()"
                      class="px-5 py-2 bg-[#0d5c3a] hover:bg-[#07472d] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            }

          </div>

          <!-- Footer -->
          <div class="px-6 py-3.5 bg-[#f8f9fa] border-t border-[#e7ebf2] flex items-center justify-between shrink-0 text-xs text-[#667085]">
            <span class="flex items-center gap-1.5">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-[#0d5c3a]">verified</mat-icon>
              <span>100% Insured Delivery with India Post Speed Post</span>
            </span>
            <button
              type="button"
              (click)="close()"
              class="font-bold text-[#15365B] hover:text-[#0d5c3a] cursor-pointer">
              Close
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class SupportModal {
  readonly market = inject(MarketplaceService);

  trackingInput = '';
  contactSubject = '';
  contactMessage = '';

  readonly faqs = signal([
    {
      q: 'How do I know the handicrafts are authentic GI tagged?',
      a: 'Every certified product comes with an official GI Certificate QR Code on its tag, verifiable against the national Geographical Indications Registry of India.'
    },
    {
      q: 'Do 100% of my purchase proceeds go to the rural artisans?',
      a: 'Yes. Shreem is a government-backed public digital infrastructure. Payments are routed directly to artisan and weaver cooperative bank accounts without intermediary cuts.'
    },
    {
      q: 'What is the estimated delivery timeframe across India?',
      a: 'All consignments are insured and shipped via India Post Speed Post priority logistics, arriving within 3 to 5 business days anywhere in India.'
    },
    {
      q: 'Can I purchase in bulk for weddings, corporate gifting or events?',
      a: 'Yes! Select the Corporate Gifting or Wedding Collection from the menu or contact our cluster coordinators directly via this portal for bulk artisan orders.'
    }
  ]);

  setTab(tab: 'track' | 'returns' | 'cancellation' | 'faqs' | 'contact') {
    this.market.activeSupportTab.set(tab);
  }

  close() {
    this.market.closeSupport();
  }

  goToOrders() {
    this.close();
    this.market.openAccount('orders');
  }

  goToGrievance() {
    this.close();
    this.market.openAccount('grievance');
  }

  searchConsignment() {
    if (!this.trackingInput.trim()) {
      this.market.showToast('Please enter a valid Speed Post tracking consignment number', 'info');
      return;
    }
    this.close();
    this.market.openAccount('orders');
    this.market.showToast(`Tracking Consignment: ${this.trackingInput.trim()} - Dispatched via Speed Post`, 'success');
  }

  submitInquiry() {
    if (!this.contactSubject.trim() || !this.contactMessage.trim()) {
      this.market.showToast('Please enter both subject and message', 'info');
      return;
    }
    this.market.showToast('Your inquiry has been submitted! Our cluster coordinator will reach out shortly.', 'success');
    this.contactSubject = '';
    this.contactMessage = '';
    this.close();
  }
}
