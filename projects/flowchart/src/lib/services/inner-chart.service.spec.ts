import { TestBed } from '@angular/core/testing';

import { InnerChartService } from './inner-chart.service';

describe('InnerChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InnerChartService = TestBed.get(InnerChartService);
    expect(service).toBeTruthy();
  });
});
