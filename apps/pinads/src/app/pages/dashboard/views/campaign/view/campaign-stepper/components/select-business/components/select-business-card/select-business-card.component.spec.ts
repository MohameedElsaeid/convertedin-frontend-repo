import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessCardComponent } from './select-business-card.component';

describe('SelectBusinessCardComponent', () => {
  let component: SelectBusinessCardComponent;
  let fixture: ComponentFixture<SelectBusinessCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBusinessCardComponent]
    });
    fixture = TestBed.createComponent(SelectBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
