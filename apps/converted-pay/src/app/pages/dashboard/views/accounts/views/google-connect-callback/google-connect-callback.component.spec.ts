import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleConnectCallbackComponent } from './google-connect-callback.component';

describe('GoogleConnectCallbackComponent', () => {
  let component: GoogleConnectCallbackComponent;
  let fixture: ComponentFixture<GoogleConnectCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleConnectCallbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleConnectCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
