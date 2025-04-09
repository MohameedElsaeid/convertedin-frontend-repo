import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviourPopupComponent } from './behaviour-popup.component';

describe('BehaviourPopupComponent', () => {
  let component: BehaviourPopupComponent;
  let fixture: ComponentFixture<BehaviourPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BehaviourPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BehaviourPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
