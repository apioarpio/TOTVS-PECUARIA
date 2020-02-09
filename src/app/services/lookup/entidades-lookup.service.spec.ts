import { TestBed } from '@angular/core/testing';

import { EntidadesLookupService } from './entidades-lookup.service';

describe('EntidadesLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntidadesLookupService = TestBed.get(EntidadesLookupService);
    expect(service).toBeTruthy();
  });
});
