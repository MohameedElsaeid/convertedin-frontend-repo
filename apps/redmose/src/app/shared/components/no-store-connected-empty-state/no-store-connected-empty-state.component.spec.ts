import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoStoreConnectedEmptyStateComponent } from './no-store-connected-empty-state.component';

describe('NoStoreConnectedEmptyStateComponent', () => {
  let component: NoStoreConnectedEmptyStateComponent;
  let fixture: ComponentFixture<NoStoreConnectedEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoStoreConnectedEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoStoreConnectedEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
