import { Component, OnInit, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
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
export class GanttChartComponent implements OnInit {

  public isMobile:boolean;
  public searchPanelCollapse:boolean;
  public CompanyDB: any;
  public PlanDefinition: any;
  public planDefinitionData: any;
  public PlanOrderNo: any;
  public planOrderData: any;
  public planDefinitionStatus: boolean = false;
  public planDefinitionOrderStatus: boolean = false;
  public GanttChartStatus: boolean = false;
  public PDStatus:boolean = false;
  public OrderStatus:boolean = false;
  public arrConfigData: any;
  public language: any;
  public PlanDefinitionSelect: any;
  public PlanOrderSelect: any;

  constructor(private route: ActivatedRoute, private notificationService: NotificationService, private router: Router,private dataService: DataService, private _elementRef: ElementRef, private GanttChartService:GanttChartService) {
  
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.mobileView();
  }
  
  ngOnInit() {
    this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));
    this.language = JSON.parse(window.localStorage.getItem('language'));
    this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
    this.getPlanDefinition(this.arrConfigData.service_url, this.CompanyDB);
    this.mobileView();
  }


  public mobileView(): void {
    if(window.innerWidth <= 767){
      this.isMobile = true;
      this.searchPanelCollapse = true;
    }else{
      this.isMobile = false;
      this.searchPanelCollapse = false;
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
    this.PlanOrderNo = '';
    if(this.PlanOrderNo == ''){
      this.OrderStatus = false;
    }
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
      this.getPlanOrderNo(this.arrConfigData.service_url, this.CompanyDB, this.PlanDefinition);
    }
    if(this.PlanOrderNo == ''){
      this.OrderStatus = false;   
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
    if(this.PlanDefinition){
      this.PlanDefinitionSelect = this.PlanDefinition;
    }
  }

  openPlanOrderNo(){
    if(!this.PlanDefinition){
      this.notificationService.show({
        content: this.language.Plan_Definition_Error,
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'right', vertical: 'top' },
        type: { style: 'error', icon: true },
        hideAfter: 3000
      });
    }else{
      this.planDefinitionOrderStatus = true;
      this.planOrderData = '';
      this.getPlanOrderNo(this.arrConfigData.service_url, this.CompanyDB, this.PlanDefinition);
      if(this.PlanOrderNo){
        this.PlanOrderSelect = this.PlanOrderNo;
      }
    }
  }

  lookupEventHander(){
    this.planDefinitionStatus = false;
    this.planDefinitionOrderStatus = false;
  }

  PlanDefinitionEventHander(e){
    this.PlanDefinition = e;
    this.PDStatus = false;
    this.PlanOrderNo = '';
    if(this.PlanOrderNo == ''){
      this.OrderStatus = false;
    }
    this.getPlanOrderNo(this.arrConfigData.service_url, this.CompanyDB, this.PlanDefinition);
  }

  PlanDefinitionOrderNoEventHander(e){
    this.PlanOrderNo = e;
    this.OrderStatus = false;
  }

  processData(){ 
    this.searchPanelCollapse = !this.searchPanelCollapse;
    if(this.searchPanelCollapse == false){
      setTimeout(()=>{
        this.searchPanelCollapse = true;
      }, 100);
    }
    this.GanttChartStatus = !this.GanttChartStatus;
    if(this.GanttChartStatus == false){
      setTimeout(()=>{
        this.GanttChartStatus = true; 
      }, 100);
    }
    this.dataService.setData(this.PlanDefinition);
    this.dataService.setOrder(this.PlanOrderNo);
  }
}
