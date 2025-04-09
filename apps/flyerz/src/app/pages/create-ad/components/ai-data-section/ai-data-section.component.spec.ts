import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiDataSectionComponent } from './ai-data-section.component';

describe('AiDataSectionComponent', () => {
  let component: AiDataSectionComponent;
  let fixture: ComponentFixture<AiDataSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiDataSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiDataSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
