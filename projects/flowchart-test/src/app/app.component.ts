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

  nodes: any = [];
  title: string = "FlowChart Example";

  constructor() {}

  ngAfterViewInit(){
    this.chart.onClickConfig.subscribe((node: Node) => {
      alert("hi from app-component listening event node.id: " + node.id);
    });
  }

  saveState() {
    this.nodes = this.chart.export();
    alert("saved snapshot");
    console.log(this.nodes);
  }

  revertState() {
    this.chart.load(this.nodes);
  }
}
