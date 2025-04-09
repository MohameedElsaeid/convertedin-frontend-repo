import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleAllCustomersComponent } from './people-all-customers.component';

describe('PeopleAllCustomersComponent', () => {
  let component: PeopleAllCustomersComponent;
  let fixture: ComponentFixture<PeopleAllCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleAllCustomersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleAllCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
