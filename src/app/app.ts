import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { MarketplaceService } from './services/marketplace.service';
import { AnnouncementBar } from './components/announcement-bar/announcement-bar';
import { Header } from './components/header/header';
import { HeroCarousel } from './components/hero-carousel/hero-carousel';
import { CategoryGrid } from './components/category-grid/category-grid';
import { ProductCard } from './components/product-card/product-card';
import { ProductCatalogue } from './components/product-catalogue/product-catalogue';
import { SellerDirectory } from './components/seller-directory/seller-directory';
import { InitiativeSection } from './components/initiative-section/initiative-section';
import { AboutSection } from './components/about-section/about-section';
import { ProductDetailPage } from './components/product-detail-page/product-detail-page';
import { ProductPreviewDialog } from './components/product-preview-dialog/product-preview-dialog';
import { CraftMap } from './components/craft-map/craft-map';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { CheckoutModal } from './components/checkout-modal/checkout-modal';
import { AccountPage } from './components/account-page/account-page';
import { TrustFooter } from './components/trust-footer/trust-footer';
import { MobileNav } from './components/mobile-nav/mobile-nav';
import { ToastContainer } from './components/toast-container/toast-container';
import { SupportModal } from './components/support-modal/support-modal';
import { MatIconModule } from '@angular/material/icon';
import { BRASS_DHOKRA_IMAGE, HANDLOOM_IMAGE, HERO_IMAGE, ORGANIC_HONEY_IMAGE } from './data/mock-data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    AnnouncementBar,
    Header,
    HeroCarousel,
    CategoryGrid,
    ProductCard,
    ProductCatalogue,
    SellerDirectory,
    InitiativeSection,
    AboutSection,
    ProductDetailPage,
    ProductPreviewDialog,
    CraftMap,
    AccountPage,
    CartDrawer,
    CheckoutModal,
    TrustFooter,
    MobileNav,
    ToastContainer,
    SupportModal,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly market = inject(MarketplaceService);

  readonly brassImage = BRASS_DHOKRA_IMAGE;
  readonly handloomImage = HANDLOOM_IMAGE;
  readonly heroImage = HERO_IMAGE;
  readonly honeyImage = ORGANIC_HONEY_IMAGE;

  readonly wishlistProducts = computed(() => {
    const ids = this.market.wishlistIds();
    return this.market.allProducts().filter(p => ids.includes(p.id));
  });

  readonly topSellers = computed(() => {
    return this.market.allSellers().slice(0, 3);
  });
}
