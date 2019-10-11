import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FlowchartComponent } from 'flowchart/flowchart';
import { Node } from 'flowchart/lib/object/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'flowchart-test';

  @ViewChild("chart", {static: false}) chart : FlowchartComponent;

  constructor() {
  }

  ngAfterViewInit(){
    console.log(this.chart === undefined, "Flowchartcomponent-undefined", "ngAfterViewInit");
    this.chart.onClickConfig.subscribe((node: Node) => {
      alert("hola desde app-componente " + node.id);
    });
  }

  something() {
    this.chart.export();
  }
}
