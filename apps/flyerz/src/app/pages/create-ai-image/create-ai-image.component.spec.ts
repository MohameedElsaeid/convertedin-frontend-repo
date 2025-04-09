import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAiImageComponent } from './create-ai-image.component';

describe('CreateAiImageComponent', () => {
  let component: CreateAiImageComponent;
  let fixture: ComponentFixture<CreateAiImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAiImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAiImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
