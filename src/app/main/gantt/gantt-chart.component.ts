import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CountdownComponent } from 'ngx-countdown';
import { DatePipe } from '@angular/common';
import { Scale } from 'src/app/core/model/scale';
import { DataService } from './data.service';
import { GanttChartService } from './service/gantt-chart.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
})
export class GanttChartComponent implements OnInit, OnDestroy {

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
  public PDStatus:boolean = false;
  public OrderStatus:boolean = false;

  constructor(private route: ActivatedRoute, private notificationService: NotificationService, private router: Router,private dataService: DataService, private _elementRef: ElementRef, private GanttChartService:GanttChartService, private translate: TranslateService, private datePipe: DatePipe) {}

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

  onPlanDefinitionBlur(){
    let Plan = this.PlanDefinition;
    let PlanFromArray = [];
    if(Plan){
      for(var i in this.planDefinitionData){
        if(Plan === this.planDefinitionData[i].Code){
          PlanFromArray.push(this.planDefinitionData[i]);
        }
      }
      if(PlanFromArray.length>0){
        this.PDStatus = false;
      }else{
        this.PDStatus = true;
      }
    }else{
        this.PDStatus = false;
    } 
  }

  onPlanOrderNoBlur(){
    if(this.PlanDefinition){
      this.getPlanOrderNo(environment.optiProGanttChartAPIURL, this.CompanyDB, this.PlanDefinition);
    }else{
      this.notificationService.show({
        content: 'Please Enter Plan Definition',
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'right', vertical: 'top' },
        type: { style: 'error', icon: true },
        hideAfter: 1000
      });  
    }
    
    if(this.planOrderData && this.planOrderData.length>0){
      let Order = this.PlanOrderNo;
      let OrderFromArray = [];
      if(Order){
      for(var i in this.planOrderData){
        if(Order == this.planOrderData[i].OPTM_SUPPLLY_ID){
          OrderFromArray.push(this.planOrderData[i]);
        }
      }
      if(OrderFromArray.length>0){
        this.OrderStatus = false;
      }else{
        this.OrderStatus = true;
      }
      }else{
        this.OrderStatus = false;
      } 
    }
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
    this.seachPanelCollapse = true;
    this.GanttChartStatus = true;
    this.dataService.setData(this.PlanDefinition);
    this.dataService.setOrder(this.PlanOrderNo);
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
    let currentUrl = this.router.url + '?';
  
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
    }

    ngOnDestroy() {
     
    }

 /* collapse(){
    this.seachPanelCollapse = true;
  }*/

}
