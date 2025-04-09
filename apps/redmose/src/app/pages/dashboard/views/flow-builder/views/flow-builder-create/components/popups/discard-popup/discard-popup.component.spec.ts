import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderDiscardPopupComponent } from './discard-popup.component';

describe('FlowBuilderDiscardPopupComponent', () => {
  let component: FlowBuilderDiscardPopupComponent;
  let fixture: ComponentFixture<FlowBuilderDiscardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderDiscardPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderDiscardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
