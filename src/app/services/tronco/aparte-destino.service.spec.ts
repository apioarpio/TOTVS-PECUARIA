import { TestBed } from '@angular/core/testing';

import { AparteDestinoService } from './aparte-destino.service';

describe('AparteDestinoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AparteDestinoService = TestBed.get(AparteDestinoService);
    expect(service).toBeTruthy();
  });
});
