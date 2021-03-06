import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowchartComponent } from './flowchart.component';
import { FlowchartElementComponent } from './flowchart-element/flowchart-element.component';
import { FlowchartSettingComponent } from './flowchart-setting/flowchart-setting.component';
import { FlowchartGraphComponent } from './flowchart-graph/flowchart-graph.component';
import { SettingService } from './services/setting.service';
import { GraphService } from './services/graph.service';
import { FlowchartControlsComponent } from './flowchart-controls/flowchart-controls.component';

@NgModule({
  declarations: [FlowchartComponent, FlowchartElementComponent, FlowchartSettingComponent, FlowchartGraphComponent, FlowchartControlsComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    SettingService,
    GraphService
  ],
  exports: [FlowchartComponent]
})
export class FlowchartModule { }
