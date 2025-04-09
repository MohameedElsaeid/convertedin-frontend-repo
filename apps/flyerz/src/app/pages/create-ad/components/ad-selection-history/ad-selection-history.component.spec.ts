import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdSelectionHistoryComponent } from './ad-selection-history.component';

describe('AdSelectionHistoryComponent', () => {
  let component: AdSelectionHistoryComponent;
  let fixture: ComponentFixture<AdSelectionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdSelectionHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdSelectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
