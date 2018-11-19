import { TestBed, inject } from '@angular/core/testing';

import { SofascoreService } from './sofascore.service';

describe('SofascoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SofascoreService]
    });
  });

  it('should be created', inject([SofascoreService], (service: SofascoreService) => {
    expect(service).toBeTruthy();
  }));
});
