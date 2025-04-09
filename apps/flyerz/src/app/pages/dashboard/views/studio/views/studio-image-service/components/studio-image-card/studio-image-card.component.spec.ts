import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudioServiceCardComponent } from './studio-service-card.component';

describe('StudioServiceCardComponent', () => {
  let component: StudioServiceCardComponent;
  let fixture: ComponentFixture<StudioServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioServiceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
