import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioPreviewPopupComponent } from './studio-preview-popup.component';

describe('StudioPreviewPopupComponent', () => {
  let component: StudioPreviewPopupComponent;
  let fixture: ComponentFixture<StudioPreviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioPreviewPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioPreviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
