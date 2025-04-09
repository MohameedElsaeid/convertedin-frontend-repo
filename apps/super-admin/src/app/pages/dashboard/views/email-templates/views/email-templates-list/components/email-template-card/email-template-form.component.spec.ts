import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailTemplateCardComponent } from './email-template-form.component';

describe('EmailTemplateCardComponent', () => {
  let component: EmailTemplateCardComponent;
  let fixture: ComponentFixture<EmailTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailTemplateCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
