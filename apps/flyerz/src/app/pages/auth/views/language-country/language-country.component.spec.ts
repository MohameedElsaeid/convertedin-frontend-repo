import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageCountryComponent } from './language-country.component';

describe('LanguageCountryComponent', () => {
  let component: LanguageCountryComponent;
  let fixture: ComponentFixture<LanguageCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCountryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
