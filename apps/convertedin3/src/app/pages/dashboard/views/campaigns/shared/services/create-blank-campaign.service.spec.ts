import { TestBed } from '@angular/core/testing';

import { CreateBlankCampaignService } from './create-blank-campaign.service';

describe('CreateBlankCampaignService', () => {
  let service: CreateBlankCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBlankCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
