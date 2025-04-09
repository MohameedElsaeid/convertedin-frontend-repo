import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetaConnectComponent } from './meta-connect.component';

describe('MetaConnectComponent', () => {
  let component: MetaConnectComponent;
  let fixture: ComponentFixture<MetaConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetaConnectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetaConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
