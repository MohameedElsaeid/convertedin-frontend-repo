import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeywordFinderComponent } from './keyword-finder.component';

describe('KeywordFinderComponent', () => {
  let component: KeywordFinderComponent;
  let fixture: ComponentFixture<KeywordFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordFinderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
