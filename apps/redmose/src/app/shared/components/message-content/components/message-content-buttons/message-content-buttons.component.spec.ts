import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageContentButtonsComponent } from './message-content-buttons.component';

describe('MessageContentButtonsComponent', () => {
  let component: MessageContentButtonsComponent;
  let fixture: ComponentFixture<MessageContentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageContentButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageContentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
