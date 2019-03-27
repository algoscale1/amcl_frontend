import { TestBed } from '@angular/core/testing';

import { DoctorAccountService } from './doctor-account.service';

describe('DoctorAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorAccountService = TestBed.get(DoctorAccountService);
    expect(service).toBeTruthy();
  });
});
