import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePopupComponent } from './delete-popup.component';

describe('DeletePopupComponent', () => {
  let component: DeletePopupComponent;
  let fixture: ComponentFixture<DeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
