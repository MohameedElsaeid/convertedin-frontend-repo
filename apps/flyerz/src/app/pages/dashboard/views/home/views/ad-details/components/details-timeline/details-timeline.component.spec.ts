import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsTimelineComponent } from './details-timeline.component';

describe('DetailsTimelineComponent', () => {
  let component: DetailsTimelineComponent;
  let fixture: ComponentFixture<DetailsTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
