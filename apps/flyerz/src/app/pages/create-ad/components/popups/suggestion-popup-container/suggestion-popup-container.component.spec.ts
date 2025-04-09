import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionPopupContainerComponent } from './suggestion-popup-container.component';

describe('SuggestionPopupContainerComponent', () => {
  let component: SuggestionPopupContainerComponent;
  let fixture: ComponentFixture<SuggestionPopupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionPopupContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionPopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
