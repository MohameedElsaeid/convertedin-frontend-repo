import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardMobileHeaderComponent } from './dashboard-mobile-header.component';

describe('DashboardMobileHeaderComponent', () => {
  let component: DashboardMobileHeaderComponent;
  let fixture: ComponentFixture<DashboardMobileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMobileHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
