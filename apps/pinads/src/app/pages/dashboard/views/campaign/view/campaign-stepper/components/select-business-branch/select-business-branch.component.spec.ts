import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessBranchComponent } from './select-business-branch.component';

describe('SelectBusinessBranchComponent', () => {
  let component: SelectBusinessBranchComponent;
  let fixture: ComponentFixture<SelectBusinessBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBusinessBranchComponent]
    });
    fixture = TestBed.createComponent(SelectBusinessBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
