import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectedGoogleAccountComponent } from './connected-google-account.component';

describe('ConnectedGoogleAccountComponent', () => {
  let component: ConnectedGoogleAccountComponent;
  let fixture: ComponentFixture<ConnectedGoogleAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedGoogleAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedGoogleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
