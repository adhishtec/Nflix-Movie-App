import { TestBed } from '@angular/core/testing';

import { HttpOmdbapiService } from './http-omdbapi.service';

describe('HttpOmdbapiService', () => {
  let service: HttpOmdbapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpOmdbapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
