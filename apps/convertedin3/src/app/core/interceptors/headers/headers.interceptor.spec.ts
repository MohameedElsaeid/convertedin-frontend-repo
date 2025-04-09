import { TestBed } from '@angular/core/testing';

import { appInterceptors } from './headers.interceptor';

describe('HeadersInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [appInterceptors],
    })
  );

  it('should be created', () => {
    const interceptor = TestBed.inject(appInterceptors);
    expect(interceptor).toBeTruthy();
  });
});
