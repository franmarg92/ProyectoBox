import { TestBed } from '@angular/core/testing';

import { PaidsService } from './paids.service';

describe('PaidsService', () => {
  let service: PaidsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaidsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
