import { TestBed } from '@angular/core/testing';

import { ResponseQuizService } from './response-quiz.service';

describe('ResponseQuizService', () => {
  let service: ResponseQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
