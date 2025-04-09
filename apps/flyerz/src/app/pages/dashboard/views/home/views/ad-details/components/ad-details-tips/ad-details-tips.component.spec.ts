import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDetailsTipsComponent } from './ad-details-tips.component';

describe('AdDetailsTipsComponent', () => {
  let component: AdDetailsTipsComponent;
  let fixture: ComponentFixture<AdDetailsTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetailsTipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetailsTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
