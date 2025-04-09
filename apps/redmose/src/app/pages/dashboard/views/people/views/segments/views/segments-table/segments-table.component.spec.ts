import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentsTableComponent } from './segments-table.component';

describe('SegmentsTableComponent', () => {
  let component: SegmentsTableComponent;
  let fixture: ComponentFixture<SegmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
