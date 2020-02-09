import { TestBed } from '@angular/core/testing';

import { LoteLookupService } from './lote-lookup.service';

describe('LoteLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoteLookupService = TestBed.get(LoteLookupService);
    expect(service).toBeTruthy();
  });
});
