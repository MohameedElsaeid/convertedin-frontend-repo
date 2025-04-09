import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioImageServiceComponent } from './studio-image-service.component';

describe('StudioImageServiceComponent', () => {
  let component: StudioImageServiceComponent;
  let fixture: ComponentFixture<StudioImageServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioImageServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioImageServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
