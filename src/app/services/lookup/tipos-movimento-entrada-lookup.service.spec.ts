import { TestBed } from '@angular/core/testing';

import { TiposMovimentoEntradaLookupService } from './tipos-movimento-entrada-lookup.service';

describe('TiposMovimentoEntradaLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposMovimentoEntradaLookupService = TestBed.get(TiposMovimentoEntradaLookupService);
    expect(service).toBeTruthy();
  });
});
