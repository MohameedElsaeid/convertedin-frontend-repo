import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletValueBannerComponent } from './wallet-value-banner.component';

describe('WalletValueBannerComponent', () => {
  let component: WalletValueBannerComponent;
  let fixture: ComponentFixture<WalletValueBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletValueBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletValueBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
