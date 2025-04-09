import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseAdPopupComponent } from './close-ad-popup.component';

describe('CloseAdPopupComponent', () => {
  let component: CloseAdPopupComponent;
  let fixture: ComponentFixture<CloseAdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseAdPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloseAdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
