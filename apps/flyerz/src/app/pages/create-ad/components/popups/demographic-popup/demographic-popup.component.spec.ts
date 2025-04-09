import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemographicPopupComponent } from './demographic-popup.component';

describe('DemographicPopupComponent', () => {
  let component: DemographicPopupComponent;
  let fixture: ComponentFixture<DemographicPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographicPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemographicPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
