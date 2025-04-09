import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderEmailEditorComponent } from './flow-builder-email-editor.component';

describe('FlowBuilderEmailEditorComponent', () => {
  let component: FlowBuilderEmailEditorComponent;
  let fixture: ComponentFixture<FlowBuilderEmailEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderEmailEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderEmailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
