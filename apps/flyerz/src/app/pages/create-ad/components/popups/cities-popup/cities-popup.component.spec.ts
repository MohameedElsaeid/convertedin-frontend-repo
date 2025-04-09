import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesPopupComponent } from './cities-popup.component';

describe('CitiesPopupComponent', () => {
  let component: CitiesPopupComponent;
  let fixture: ComponentFixture<CitiesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
