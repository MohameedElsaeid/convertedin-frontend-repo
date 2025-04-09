import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingProsComponent } from './landing-pros.component';

describe('LandingProsComponent', () => {
  let component: LandingProsComponent;
  let fixture: ComponentFixture<LandingProsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingProsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingProsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
