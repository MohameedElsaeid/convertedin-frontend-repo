import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetaAccountCallbackComponent } from './meta-account-callback.component';

describe('MetaAccountCallbackComponent', () => {
  let component: MetaAccountCallbackComponent;
  let fixture: ComponentFixture<MetaAccountCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaAccountCallbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetaAccountCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
