import { TestBed } from '@angular/core/testing';

import { AqgrLibUtilsService } from './aqgr-lib-utils.service';

describe('AqgrLibUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AqgrLibUtilsService = TestBed.get(AqgrLibUtilsService);
    expect(service).toBeTruthy();
  });
});
