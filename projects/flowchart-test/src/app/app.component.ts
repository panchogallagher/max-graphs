import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FlowchartComponent } from 'flowchart/flowchart';
import { Node } from 'flowchart/lib/object/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild("chart", {static: false}) chart : FlowchartComponent;

  title: string = "FlowChart Example";

  graph: any = {};
  
  graphJSON: string = null;
  viewJSON: boolean = false;
  buttonJSON: string = "Ver JSON";

  constructor() {}

  ngAfterViewInit(){
    this.chart.onClickConfig.subscribe((node: Node) => {
      alert("hi from app-component listening event node.id: " + node.id);
    });
  }

  saveState() {
    this.graph = this.chart.export();
    this.graphJSON = JSON.stringify(this.graph);
    alert("saved snapshot");
    console.log(this.graph);
  }

  revertState() {
    this.chart.load(this.graph);
    let jsonContent = JSON.stringify(this.graph);
    if (jsonContent !== '{}') {
      this.graphJSON = jsonContent;
    }
  }

  onClickViewJSON() {
    this.viewJSON = !this.viewJSON;
    this.buttonJSON = this.viewJSON ? "Ocultar JSON" : "Ver JSON";
  }
}
