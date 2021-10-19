import { TestBed } from '@angular/core/testing';

import { AtuhenticationGuard } from './atuhentication.guard';

describe('AtuhenticationGuard', () => {
  let guard: AtuhenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AtuhenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
