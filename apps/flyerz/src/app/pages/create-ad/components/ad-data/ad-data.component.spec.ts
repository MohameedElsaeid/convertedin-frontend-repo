import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdDataComponent } from './ad-data.component';

describe('AdDataComponent', () => {
  let component: AdDataComponent;
  let fixture: ComponentFixture<AdDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
