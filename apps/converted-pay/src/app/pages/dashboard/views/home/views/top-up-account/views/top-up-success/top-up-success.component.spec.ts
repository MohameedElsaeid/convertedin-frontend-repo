import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopUpSuccessComponent } from './top-up-success.component';

describe('TopUpSuccessComponent', () => {
  let component: TopUpSuccessComponent;
  let fixture: ComponentFixture<TopUpSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUpSuccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopUpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
