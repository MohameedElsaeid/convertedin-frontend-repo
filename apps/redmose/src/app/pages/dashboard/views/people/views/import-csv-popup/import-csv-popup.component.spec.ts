import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportCsvPopupComponent } from './import-csv-popup.component';

describe('ImportCsvPopupComponent', () => {
  let component: ImportCsvPopupComponent;
  let fixture: ComponentFixture<ImportCsvPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportCsvPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportCsvPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
