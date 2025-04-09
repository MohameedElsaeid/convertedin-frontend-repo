import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdTargetingSelectionComponent } from './ad-targeting-selection.component';

describe('AdTargetingSelectionComponent', () => {
  let component: AdTargetingSelectionComponent;
  let fixture: ComponentFixture<AdTargetingSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdTargetingSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdTargetingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
