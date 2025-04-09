import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsConnectComponent } from './accounts-connect.component';

describe('AccountsConnectComponent', () => {
  let component: AccountsConnectComponent;
  let fixture: ComponentFixture<AccountsConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsConnectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
