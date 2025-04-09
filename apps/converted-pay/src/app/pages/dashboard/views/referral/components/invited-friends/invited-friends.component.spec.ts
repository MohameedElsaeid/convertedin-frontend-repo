import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitedFriendsComponent } from './invited-friends.component';

describe('InvitedFriendsComponent', () => {
  let component: InvitedFriendsComponent;
  let fixture: ComponentFixture<InvitedFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitedFriendsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitedFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
