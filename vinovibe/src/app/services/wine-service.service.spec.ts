import { TestBed } from '@angular/core/testing';

import { WineServiceService } from './wine-service.service';

describe('WineServiceService', () => {
  let service: WineServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
