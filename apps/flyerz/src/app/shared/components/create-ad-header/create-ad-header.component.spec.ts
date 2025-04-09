import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAdHeaderComponent } from './create-ad-header.component';

describe('CreateAdHeaderComponent', () => {
  let component: CreateAdHeaderComponent;
  let fixture: ComponentFixture<CreateAdHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
