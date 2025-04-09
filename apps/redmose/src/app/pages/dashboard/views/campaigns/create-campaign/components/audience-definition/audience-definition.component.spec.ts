import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudienceDefinitionComponent } from './audience-definition.component';

describe('AudienceDefinitionComponent', () => {
  let component: AudienceDefinitionComponent;
  let fixture: ComponentFixture<AudienceDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudienceDefinitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AudienceDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
