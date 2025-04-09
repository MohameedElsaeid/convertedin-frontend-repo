import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDetailsDataComponent } from './ad-details-data.component';

describe('AdDetailsDataComponent', () => {
  let component: AdDetailsDataComponent;
  let fixture: ComponentFixture<AdDetailsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetailsDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetailsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
