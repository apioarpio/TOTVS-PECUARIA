import { TestBed } from '@angular/core/testing';

import { ContextoService } from './contexto.service';

describe('ContextoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContextoService = TestBed.get(ContextoService);
    expect(service).toBeTruthy();
  });
});
