import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertiseLocationComponent } from './advertise-location.component';

describe('AdvertiseLocationComponent', () => {
  let component: AdvertiseLocationComponent;
  let fixture: ComponentFixture<AdvertiseLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertiseLocationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvertiseLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
