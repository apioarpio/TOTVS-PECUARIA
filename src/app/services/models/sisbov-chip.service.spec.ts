import { TestBed } from '@angular/core/testing';

import { SisbovChipService } from './sisbov-chip.service';

describe('SisbovChipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SisbovChipService = TestBed.get(SisbovChipService);
    expect(service).toBeTruthy();
  });
});
