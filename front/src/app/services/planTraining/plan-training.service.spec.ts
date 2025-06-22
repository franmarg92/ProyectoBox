import { TestBed } from '@angular/core/testing';

import { PlanTrainingService } from './plan-training.service';

describe('PlanTrainingService', () => {
  let service: PlanTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
