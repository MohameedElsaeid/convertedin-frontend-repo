import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageGenerateWithAiComponent } from './message-generate-with-ai.component';

describe('MessageGenerateWithAiComponent', () => {
  let component: MessageGenerateWithAiComponent;
  let fixture: ComponentFixture<MessageGenerateWithAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageGenerateWithAiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageGenerateWithAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
