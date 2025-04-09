import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAppLangComponent } from './select-app-lang.component';

describe('SelectAppLangComponent', () => {
  let component: SelectAppLangComponent;
  let fixture: ComponentFixture<SelectAppLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAppLangComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAppLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
