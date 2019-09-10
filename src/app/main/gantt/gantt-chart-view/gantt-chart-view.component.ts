import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';

@Component({
  selector: 'app-gantt-chart-view',
  templateUrl: './gantt-chart-view.component.html',
  styleUrls: ['./gantt-chart-view.component.scss']
})
export class GanttChartViewComponent implements OnInit {
    ngOnInit(): void {
    }


    public editorOptions: GanttEditorOptions;
    public data: any;
    @ViewChild(GanttEditorComponent, { static: true }) editor: GanttEditorComponent;
  
    constructor() { 
      this.editorOptions = new GanttEditorOptions()
       this.data = [{
        'pID': 1,
        'pName': 'Define Chart API',
        'pStart': '',
        'pEnd': '',
        'pClass': 'ggroupblack',
        'pLink': '',
        'pMile': 0,
        'pRes': 'Brian',
        'pComp': 0,
        'pGroup': 1,
        'pParent': 0,
        'pOpen': 1,
        'pDepend': '',
        'pCaption': '',
        'pNotes': 'Some Notes text'
      }]; 
    }
}
