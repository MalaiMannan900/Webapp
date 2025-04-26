import { TestBed } from '@angular/core/testing';

import { RegisterMasterService } from './register-master.service';

describe('RegisterMasterService', () => {
  let service: RegisterMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
