import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioVideoServiceComponent } from './studio-video-service.component';

describe('StudioVideoServiceComponent', () => {
  let component: StudioVideoServiceComponent;
  let fixture: ComponentFixture<StudioVideoServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioVideoServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioVideoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
