import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterestsPopupComponent } from './interests-popup.component';

describe('InterestsPopupComponent', () => {
  let component: InterestsPopupComponent;
  let fixture: ComponentFixture<InterestsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestsPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
