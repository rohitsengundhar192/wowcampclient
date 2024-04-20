import { TestBed } from '@angular/core/testing';

import { CehpService } from './cehp.service';

describe('CehpService', () => {
  let service: CehpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CehpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
