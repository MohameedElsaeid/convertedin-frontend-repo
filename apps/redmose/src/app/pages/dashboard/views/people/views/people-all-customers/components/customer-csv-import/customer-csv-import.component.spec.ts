import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCsvImportComponent } from './customer-csv-import.component';

describe('CustomerCsvImportComponent', () => {
  let component: CustomerCsvImportComponent;
  let fixture: ComponentFixture<CustomerCsvImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCsvImportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCsvImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
