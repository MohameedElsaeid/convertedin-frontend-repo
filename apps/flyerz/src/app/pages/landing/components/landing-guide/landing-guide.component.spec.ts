import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingGuideComponent } from './landing-guide.component';

describe('LandingGuideComponent', () => {
  let component: LandingGuideComponent;
  let fixture: ComponentFixture<LandingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingGuideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
