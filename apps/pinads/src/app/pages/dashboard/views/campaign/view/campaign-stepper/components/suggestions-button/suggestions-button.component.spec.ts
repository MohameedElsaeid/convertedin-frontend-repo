import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionsButtonComponent } from './suggestions-button.component';

describe('SuggestionsButtonComponent', () => {
  let component: SuggestionsButtonComponent;
  let fixture: ComponentFixture<SuggestionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionsButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
