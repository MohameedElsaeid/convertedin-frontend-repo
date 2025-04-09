import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdTargetComponent } from './ad-target.component';

describe('AdTargetComponent', () => {
  let component: AdTargetComponent;
  let fixture: ComponentFixture<AdTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdTargetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
