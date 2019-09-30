import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-flowchart',
  template: `
    <p>
      <b>flowchart</b> works fine!!!!
    </p>
  `,
  styles: []
})
export class FlowchartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("loaded");
  }

}
