import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacebookComponent } from './facebook.component';

describe('FacebookComponent', () => {
  let component: FacebookComponent;
  let fixture: ComponentFixture<FacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
