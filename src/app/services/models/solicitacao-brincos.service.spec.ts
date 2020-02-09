import { TestBed } from '@angular/core/testing';

import { SolicitacaoBrincosService } from './solicitacao-brincos.service';

describe('SolicitacaoBrincosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitacaoBrincosService = TestBed.get(SolicitacaoBrincosService);
    expect(service).toBeTruthy();
  });
});
