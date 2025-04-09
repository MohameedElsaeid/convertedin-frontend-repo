import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectFaceboookComponent } from './connect-faceboook.component';

describe('ConnectFaceboookComponent', () => {
  let component: ConnectFaceboookComponent;
  let fixture: ComponentFixture<ConnectFaceboookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectFaceboookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectFaceboookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
