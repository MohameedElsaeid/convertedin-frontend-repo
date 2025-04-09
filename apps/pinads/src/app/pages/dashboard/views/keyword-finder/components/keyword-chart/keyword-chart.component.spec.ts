import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeywordChartComponent } from './keyword-chart.component';

describe('KeywordChartComponent', () => {
  let component: KeywordChartComponent;
  let fixture: ComponentFixture<KeywordChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
