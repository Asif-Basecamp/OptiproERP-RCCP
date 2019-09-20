import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { GanttChartService } from './service/gantt-chart.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '@progress/kendo-angular-notification';
import { TranslateService } from '@ngx-translate/core';
import { CountdownComponent } from 'ngx-countdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {

  public isMobile:boolean;
  public seachPanelCollapse:boolean;
  public CompanyDB: any;
  public planDefinition: any;

  constructor(private GanttChartService:GanttChartService, private notificationService: NotificationService, private translate: TranslateService, private datePipe: DatePipe) { }

  @HostListener('window:resize', ['$event']) onResize() {
    this.mobileView();
  }
  
  ngOnInit() {
    this.CompanyDB =  'PLANNING_ENGINE03',
    this.openPlanDefinition(environment.optiProGanttChartAPIURL, this.CompanyDB);
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

  openPlanDefinition(api, companyDB){
      this.GanttChartService.GetPlanDefinition(api, companyDB).subscribe(
        data => {
          this.planDefinition = data;
          console.log(this.planDefinition);
        });    
  }

  openPlanOrderNumber(){
    alert('hello');
  }

}
