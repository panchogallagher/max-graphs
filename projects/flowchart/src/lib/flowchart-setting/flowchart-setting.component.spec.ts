import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowchartSettingComponent } from './flowchart-setting.component';

describe('FlowchartSettingComponent', () => {
  let component: FlowchartSettingComponent;
  let fixture: ComponentFixture<FlowchartSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowchartSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowchartSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
