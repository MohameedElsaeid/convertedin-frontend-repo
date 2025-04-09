import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAiVideoComponent } from './create-ai-video.component';

describe('CreateAiVideoComponent', () => {
  let component: CreateAiVideoComponent;
  let fixture: ComponentFixture<CreateAiVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAiVideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAiVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
