import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeywordDifficultyChartComponent } from './keyword-difficulty-chart.component';

describe('KeywordDifficultyChartComponent', () => {
  let component: KeywordDifficultyChartComponent;
  let fixture: ComponentFixture<KeywordDifficultyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordDifficultyChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordDifficultyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
