import { TestBed } from '@angular/core/testing';

import { IRegisterService } from './iregister.service';

describe('IRegisterService', () => {
  let service: IRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
