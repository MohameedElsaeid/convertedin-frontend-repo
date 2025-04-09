import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideVideoPopupComponent } from './guide-video-popup.component';

describe('GuideVideoPopupComponent', () => {
  let component: GuideVideoPopupComponent;
  let fixture: ComponentFixture<GuideVideoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideVideoPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuideVideoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
