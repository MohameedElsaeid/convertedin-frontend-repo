import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessBranchCardComponent } from './select-business-branch-card.component';

describe('SelectBusinessBranchCardComponent', () => {
  let component: SelectBusinessBranchCardComponent;
  let fixture: ComponentFixture<SelectBusinessBranchCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBusinessBranchCardComponent]
    });
    fixture = TestBed.createComponent(SelectBusinessBranchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
