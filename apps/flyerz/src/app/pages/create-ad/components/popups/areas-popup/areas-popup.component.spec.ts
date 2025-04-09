import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreasPopupComponent } from './areas-popup.component';

describe('AreasPopupComponent', () => {
  let component: AreasPopupComponent;
  let fixture: ComponentFixture<AreasPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AreasPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
