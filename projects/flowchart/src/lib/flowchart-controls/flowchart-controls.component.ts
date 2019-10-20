import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'flowchart-controls',
  templateUrl: './flowchart-controls.component.html',
  styleUrls: ['./flowchart-controls.component.css']
})
export class FlowchartControlsComponent implements OnInit {

  constructor(private _service: GraphService) { }

  ngOnInit() {
  }

  onZoomIn() {
    this._service.zoomIn();
  }

  onZoomOut() {
    this._service.zoomOut();
  }
}
