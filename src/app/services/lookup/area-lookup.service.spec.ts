import { TestBed } from '@angular/core/testing';

import { AreaLookupService } from './area-lookup.service';

describe('AreaLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaLookupService = TestBed.get(AreaLookupService);
    expect(service).toBeTruthy();
  });
});
