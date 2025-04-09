import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToActiveGoogleComponent } from './how-to-active-google.component';

describe('HowToActiveGoogleComponent', () => {
  let component: HowToActiveGoogleComponent;
  let fixture: ComponentFixture<HowToActiveGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToActiveGoogleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HowToActiveGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
