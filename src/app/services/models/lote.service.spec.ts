import { TestBed } from '@angular/core/testing';

import { LoteService } from './lote.service';

describe('LoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoteService = TestBed.get(LoteService);
    expect(service).toBeTruthy();
  });
});
