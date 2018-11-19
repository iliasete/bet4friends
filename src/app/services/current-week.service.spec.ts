import { TestBed, inject } from '@angular/core/testing';

import { CurrentWeekService } from './current-week.service';

describe('CurrentWeekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentWeekService]
    });
  });

  it('should be created', inject([CurrentWeekService], (service: CurrentWeekService) => {
    expect(service).toBeTruthy();
  }));
});
