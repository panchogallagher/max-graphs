import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlowchartComponent } from './flowchart.component';
import { FlowchartElementComponent } from './flowchart-element/flowchart-element.component';
import { FlowchartSettingComponent } from './flowchart-setting/flowchart-setting.component';
import { FlowchartGraphComponent } from './flowchart-graph/flowchart-graph.component';
import { CommonModule } from '@angular/common';
import { SettingService } from './services/setting.service';

@NgModule({
  declarations: [FlowchartComponent, FlowchartElementComponent, FlowchartSettingComponent, FlowchartGraphComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    SettingService
  ],
  exports: [FlowchartComponent]
})
export class FlowchartModule { }
