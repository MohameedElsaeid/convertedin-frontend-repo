import { TestBed } from '@angular/core/testing';

import { CreateWorkflowService } from './create-workflow.service';

describe('CreateWorkflowService', () => {
  let service: CreateWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
