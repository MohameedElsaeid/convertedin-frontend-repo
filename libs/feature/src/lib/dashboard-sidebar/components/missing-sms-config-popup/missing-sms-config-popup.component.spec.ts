import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissingSmsConfigPopupComponent } from './missing-sms-config-popup.component';

describe('MissingSmsConfigPopupComponent', () => {
  let component: MissingSmsConfigPopupComponent;
  let fixture: ComponentFixture<MissingSmsConfigPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingSmsConfigPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MissingSmsConfigPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
