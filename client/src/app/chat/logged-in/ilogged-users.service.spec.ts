import { TestBed } from '@angular/core/testing';

import { ILoggedUsersService } from './ilogged-users.service';

describe('ILoggedUsersService', () => {
  let service: ILoggedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ILoggedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
