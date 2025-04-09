import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GendersPopupComponent } from './genders-popup.component';

describe('GendersPopupComponent', () => {
  let component: GendersPopupComponent;
  let fixture: ComponentFixture<GendersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GendersPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GendersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
