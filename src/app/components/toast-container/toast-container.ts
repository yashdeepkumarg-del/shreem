import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketplaceService } from '../../services/marketplace.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Floating Toast Alerts (Top Right on desktop, Top Center on mobile) -->
    <div 
      class="fixed top-16 right-4 sm:right-6 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 pointer-events-none"
      aria-live="polite">
      @for (toast of market.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto bg-[#15365B] text-white p-3.5 rounded-xl shadow-xl border border-white/10 flex items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2 duration-200">
          
          <div class="flex items-center gap-2.5 min-w-0">
            @if (toast.type === 'success') {
              <mat-icon class="!w-4.5 !h-4.5 !text-[18px] text-emerald-400 shrink-0">check_circle</mat-icon>
            } @else if (toast.type === 'error') {
              <mat-icon class="!w-4.5 !h-4.5 !text-[18px] text-rose-400 shrink-0">error</mat-icon>
            } @else {
              <mat-icon class="!w-4.5 !h-4.5 !text-[18px] text-amber-400 shrink-0">info</mat-icon>
            }
            <span class="font-medium text-white/95 leading-snug line-clamp-2">
              {{ toast.message }}
            </span>
          </div>

          <button
            type="button"
            (click)="market.dismissToast(toast.id)"
            class="text-white/60 hover:text-white shrink-0 p-1"
            aria-label="Dismiss alert">
            <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">close</mat-icon>
          </button>

        </div>
      }
    </div>
  `
})
export class ToastContainer {
  readonly market = inject(MarketplaceService);
}
