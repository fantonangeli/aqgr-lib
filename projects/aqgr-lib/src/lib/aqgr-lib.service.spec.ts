import { TestBed } from '@angular/core/testing';

import { AqgrLibService } from './aqgr-lib.service';

describe('AqgrLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AqgrLibService = TestBed.get(AqgrLibService);
    expect(service).toBeTruthy();
  });
});
