import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPlansComponent } from './subscription-plans.component';

describe('SubscriptionPlansComponent', () => {
  let component: SubscriptionPlansComponent;
  let fixture: ComponentFixture<SubscriptionPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPlansComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
