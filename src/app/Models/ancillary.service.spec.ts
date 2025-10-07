import { TestBed } from '@angular/core/testing';

import { AncillaryService } from './ancillary.service';

describe('AncillaryService', () => {
  let service: AncillaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AncillaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
