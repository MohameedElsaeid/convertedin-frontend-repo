import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VatDialogComponent } from './vat-dialog.component';

describe('VatDialogComponent', () => {
  let component: VatDialogComponent;
  let fixture: ComponentFixture<VatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VatDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
