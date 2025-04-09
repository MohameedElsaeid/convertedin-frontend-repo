import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDetailsStatisticsComponent } from './ad-details-statistics.component';

describe('AdDetailsStatisticsComponent', () => {
  let component: AdDetailsStatisticsComponent;
  let fixture: ComponentFixture<AdDetailsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetailsStatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetailsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
