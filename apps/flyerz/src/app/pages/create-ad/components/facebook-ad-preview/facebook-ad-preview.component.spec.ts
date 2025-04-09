import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacebookAdPreviewComponent } from './facebook-ad-preview.component';

describe('FacebookAdPreviewComponent', () => {
  let component: FacebookAdPreviewComponent;
  let fixture: ComponentFixture<FacebookAdPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacebookAdPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FacebookAdPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
