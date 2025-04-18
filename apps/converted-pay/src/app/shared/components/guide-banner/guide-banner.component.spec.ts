import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideBannerComponent } from './guide-banner.component';

describe('GuideBannerComponent', () => {
  let component: GuideBannerComponent;
  let fixture: ComponentFixture<GuideBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuideBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
