import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlowBuilderListingComponent } from './flow-builder-listing.component';

describe('FlowBuilderListingComponent', () => {
  let component: FlowBuilderListingComponent;
  let fixture: ComponentFixture<FlowBuilderListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlowBuilderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
