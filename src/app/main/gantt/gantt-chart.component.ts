import { Component, OnInit, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CountdownComponent } from 'ngx-countdown';
import { DatePipe } from '@angular/common';
import { Scale } from 'src/app/core/model/scale';
import { DataService } from './data.service';
import { GanttChartService } from './service/gantt-chart.service';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
})
export class GanttChartComponent implements OnInit {

  public isMobile:boolean;
  public seachPanelCollapse:boolean;
  public CompanyDB: any;
  public PlanDefinition: any;
  public planDefinitionData: any;
  public PlanOrderNo: any;
  public planOrderData: any;
  public planDefinitionStatus: boolean = false;
  public planDefinitionOrderStatus: boolean = false;
  public GanttChartStatus: boolean;
  public loading: boolean = false;


  constructor(private dataService: DataService, private _elementRef: ElementRef, private GanttChartService:GanttChartService, private translate: TranslateService, private datePipe: DatePipe) { 

  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.mobileView();
  }
  
  ngOnInit() {
    this.CompanyDB =  'PLANNING_ENGINE03',
    this.getPlanDefinition(environment.optiProGanttChartAPIURL, this.CompanyDB);
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

  getPlanDefinition(api, companyDB){
    this.GanttChartService.GetPlanDefinition(api, companyDB).subscribe(
      data => {
        this.planDefinitionData = data;
    });    
  }

  getPlanOrderNo(api, companyDB, PlanDefinition){
    this.GanttChartService.GetPlanOrderNo(api, companyDB, PlanDefinition).subscribe(
      data => {
        this.planOrderData = data;
      });    
  }

  openPlanDefinition(){
    this.planDefinitionStatus = true;
  }

  openPlanOrderNo(){
    this.planDefinitionOrderStatus = true;
  }

  lookupEventHander(){
    this.planDefinitionStatus = false;
    this.planDefinitionOrderStatus = false;
  }

  PlanDefinitionEventHander(e){
    this.PlanDefinition = e;
    this.getPlanOrderNo(environment.optiProGanttChartAPIURL, this.CompanyDB, this.PlanDefinition);
  }

  PlanDefinitionOrderNoEventHander(e){
    this.PlanOrderNo = e;
  }

  processData(){
    //this.seachPanelCollapse = false;
    this.collapse();
    this.GanttChartStatus = true;
    this.dataService.setData(this.PlanDefinition);
    this.dataService.setOrder(this.PlanOrderNo);
  }

  collapse(){
    this.seachPanelCollapse = true;
  }

}
