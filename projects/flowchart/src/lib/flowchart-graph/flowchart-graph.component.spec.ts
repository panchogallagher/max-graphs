import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowchartGraphComponent } from './flowchart-graph.component';

describe('FlowchartGraphComponent', () => {
  let component: FlowchartGraphComponent;
  let fixture: ComponentFixture<FlowchartGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowchartGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowchartGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
