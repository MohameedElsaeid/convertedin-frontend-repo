import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderEmailImportTemplateComponent } from './flow-builder-email-import-template.component';

describe('FlowBuilderEmailImportTemplateComponent', () => {
  let component: FlowBuilderEmailImportTemplateComponent;
  let fixture: ComponentFixture<FlowBuilderEmailImportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderEmailImportTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderEmailImportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
