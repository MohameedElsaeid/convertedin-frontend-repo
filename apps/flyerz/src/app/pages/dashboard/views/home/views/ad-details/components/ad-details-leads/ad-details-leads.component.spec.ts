import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDetailsLeadsComponent } from './ad-details-leads.component';

describe('AdDetailsLeadsComponent', () => {
  let component: AdDetailsLeadsComponent;
  let fixture: ComponentFixture<AdDetailsLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetailsLeadsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetailsLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
