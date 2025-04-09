import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReassignPopupComponent } from './reassign-popup.component';

describe('ReassignPopupComponent', () => {
  let component: ReassignPopupComponent;
  let fixture: ComponentFixture<ReassignPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReassignPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReassignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
