import { TestBed } from '@angular/core/testing';

import { ILogInService } from './i-log-in.service';

describe('ILogInService', () => {
  let service: ILogInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ILogInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
