import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetingKeywordComponent } from './targeting-keyword.component';

describe('TargetingKeywordComponent', () => {
  let component: TargetingKeywordComponent;
  let fixture: ComponentFixture<TargetingKeywordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetingKeywordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetingKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
