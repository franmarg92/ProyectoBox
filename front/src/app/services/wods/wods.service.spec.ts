import { TestBed } from '@angular/core/testing';

import { WodsService } from './wods.service';

describe('WodsService', () => {
  let service: WodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
