import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioServiceHeaderComponent } from './studio-service-header.component';

describe('StudioServiceHeaderComponent', () => {
  let component: StudioServiceHeaderComponent;
  let fixture: ComponentFixture<StudioServiceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioServiceHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioServiceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
