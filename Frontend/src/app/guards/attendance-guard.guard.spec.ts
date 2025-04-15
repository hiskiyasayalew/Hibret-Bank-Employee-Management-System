import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { attendanceGuardGuard } from './attendance-guard.guard';

describe('attendanceGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => attendanceGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
