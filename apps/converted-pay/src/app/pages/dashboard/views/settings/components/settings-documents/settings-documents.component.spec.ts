import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsDocumentsComponent } from './settings-documents.component';

describe('SettingsDocumentsComponent', () => {
  let component: SettingsDocumentsComponent;
  let fixture: ComponentFixture<SettingsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDocumentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
