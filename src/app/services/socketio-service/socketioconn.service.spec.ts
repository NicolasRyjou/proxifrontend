import { TestBed } from '@angular/core/testing';

import { SocketioconnService } from './socketioconn.service';

describe('SocketioconnService', () => {
  let service: SocketioconnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketioconnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
