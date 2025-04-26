import { TestBed } from '@angular/core/testing';

import { LoginMasterService } from './login-master.service';

describe('LoginMasterService', () => {
  let service: LoginMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
