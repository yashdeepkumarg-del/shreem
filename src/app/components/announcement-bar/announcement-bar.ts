import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-announcement-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <aside
      aria-label="Artisan marketplace announcements and accessibility"
      class="border-t-[4px] border-[#19134f] bg-[#19134f] text-white/95">
      <div class="mx-auto flex min-h-[32px] items-center justify-between gap-2 px-3 py-1 text-[10px] sm:min-h-[40px] sm:px-4 sm:text-xs">
        <div class="flex min-w-0 items-center gap-1.5 font-semibold tracking-wide">
          <mat-icon class="!h-3.5 !w-3.5 !text-[14px] text-[#ffd24d]">handshake</mat-icon>
          <span class="whitespace-nowrap">Support Indian Artisans</span>
          <span class="hidden text-white/45 sm:inline">|</span>
          <span class="hidden whitespace-nowrap text-white/80 sm:inline">100% Authentic Handcrafted Products</span>
        </div>

        <div class="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
          <div class="flex items-center gap-1 text-[10px]">
            <button
              type="button"
              (click)="market.currentLanguage.set('hi')"
              [class.font-bold]="market.currentLanguage() === 'hi'"
              [class.text-[#ffd24d]]="market.currentLanguage() === 'hi'"
              [class.text-white/75]="market.currentLanguage() !== 'hi'"
              class="transition hover:text-white">
              हिन्दी
            </button>
            <span class="text-white/40">|</span>
            <button
              type="button"
              (click)="market.currentLanguage.set('en')"
              [class.font-bold]="market.currentLanguage() === 'en'"
              [class.text-[#ffd24d]]="market.currentLanguage() === 'en'"
              [class.text-white/75]="market.currentLanguage() !== 'en'"
              class="transition hover:text-white">
              English
            </button>
          </div>

          <span class="hidden text-white/35 sm:inline">|</span>

          <div class="hidden items-center gap-1 sm:flex" aria-label="Accessibility font size">
            <span class="mr-0.5 text-white/65">A</span>
            <button
              type="button"
              (click)="market.setFontScale('normal')"
              [class.text-[#ffd24d]]="market.fontScale() === 'normal'"
              [class.font-bold]="market.fontScale() === 'normal'"
              class="px-0.5 text-white/80 hover:text-white"
              aria-label="Normal font size">
              A
            </button>
            <button
              type="button"
              (click)="market.setFontScale('large')"
              [class.text-[#ffd24d]]="market.fontScale() === 'large'"
              [class.font-bold]="market.fontScale() === 'large'"
              class="px-0.5 text-white/80 hover:text-white"
              aria-label="Increase font size">
              A+
            </button>
          </div>

          <span class="hidden text-white/35 sm:inline">|</span>

          <button
            type="button"
            (click)="market.toggleAccountModal(true)"
            class="flex items-center gap-1 text-white/90 transition hover:text-[#ffd24d]"
            aria-label="Help and support">
            <mat-icon class="!h-3.5 !w-3.5 !text-[14px]">headset_mic</mat-icon>
            <span class="hidden sm:inline">Help &amp; Support</span>
          </button>
        </div>
      </div>
    </aside>
  `
})
export class AnnouncementBar {
  readonly market = inject(MarketplaceService);
}
