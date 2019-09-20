import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {

  public isMobile:boolean;
  public seachPanelCollapse:boolean;

  constructor() { }
  @HostListener('window:resize', ['$event']) onResize() {
    this.mobileView();
  }
  
  ngOnInit() {
    this.mobileView();
  }

  public mobileView(): void {
    if(window.innerWidth <= 767){
      this.isMobile = true;
      this.seachPanelCollapse = true;
    }else{
      this.isMobile = false;
      this.seachPanelCollapse = false;
    }
  }

  openPlanDefinition(){
    alert('hello');
  }

  openPlanOrderNumber(){
    alert('hello');
  }

}
