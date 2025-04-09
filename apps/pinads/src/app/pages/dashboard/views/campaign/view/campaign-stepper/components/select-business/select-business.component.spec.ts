import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessComponent } from './select-business.component';

describe('SelectBusinessComponent', () => {
  let component: SelectBusinessComponent;
  let fixture: ComponentFixture<SelectBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBusinessComponent]
    });
    fixture = TestBed.createComponent(SelectBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
