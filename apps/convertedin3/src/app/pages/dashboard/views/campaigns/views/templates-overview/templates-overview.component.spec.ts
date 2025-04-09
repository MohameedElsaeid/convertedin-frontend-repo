import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplatesOverviewComponent } from './templates-overview.component';

describe('TemplatesOverviewComponent', () => {
  let component: TemplatesOverviewComponent;
  let fixture: ComponentFixture<TemplatesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
