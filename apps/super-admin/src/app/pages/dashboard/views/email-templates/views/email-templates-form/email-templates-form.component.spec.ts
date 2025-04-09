import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailTemplatesFormComponent } from './email-templates-form.component';

describe('EmailTemplatesCreateComponent', () => {
  let component: EmailTemplatesFormComponent;
  let fixture: ComponentFixture<EmailTemplatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailTemplatesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailTemplatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
