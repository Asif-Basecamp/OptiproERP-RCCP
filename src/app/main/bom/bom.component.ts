import { Component, OnInit, ViewChild } from '@angular/core';
import { BOMService } from './service/bom.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '@progress/kendo-angular-notification';
import { TranslateService } from '@ngx-translate/core';
import { CountdownComponent } from 'ngx-countdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.scss']
})
export class BOMComponent implements OnInit {
  
  public gridData: any;
  public bomGrid: boolean = false;
  public CompanyDB: any;
  public lookupStatus: boolean = false;
  public WarehouseStatus: boolean = false;
  public itemCode: any;
  public warehouseCode: any;
  // @ts-ignore
  @ViewChild('countdown') counter: CountdownComponent;
  public ItemCodeFrom: any;
  public ItemCodeTo: any;
  public WarehouseFrom: any;
  public WarehouseTo: any;
  public IsPrimary: any = 'Y';
  myVar1 = true;
  public SimpleGridEnableLoader: boolean = false;
  public refreshStatus:boolean = false;
  public Hour: any;
  Hours: any;
  public value: any;
  public hour: any;
  public myVar: any;
  public hours: any;
  public minutes: any;
  public seconds: any;
  time: any;
  public ItemData: any;
  public WarehouseData: any;

  constructor(private BOMService: BOMService, private notificationService: NotificationService, private translate: TranslateService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.CompanyDB = 'OPTIPRO129';
    this.getItemData(environment.optiProDashboardAPIURL, this.CompanyDB);
    this.getWarehouseData(environment.optiProDashboardAPIURL, this.CompanyDB);
  }

  getItemData(api, companyDB){
    this.BOMService.GetItemList(api, companyDB).subscribe(
      data => {
        this.ItemData = data;
      });    
  } 

  getWarehouseData(api, companyDB){
    this.BOMService.GetWarehouseList(api, companyDB).subscribe(
      data => {
        this.WarehouseData = data;
      });    
  } 

  onChange(e){
    if(e.target.checked){
      this.IsPrimary = 'Y';
    }else{
      this.IsPrimary = 'N';
    }
  }

  lookupEventHander(){
    this.lookupStatus = false;
  }

  openItemCodeFromLookup(){
    this.lookupStatus = true;
    this.itemCode = 'From';
  }

  openItemCodeToLookup(){
    this.lookupStatus = true;
    this.itemCode = 'To';
  }

  itemCodeEventHander(e){
    if(this.itemCode == 'From'){
      this.ItemCodeFrom = e;
    }if(this.itemCode == 'To'){
      this.ItemCodeTo = e;
    } 
  }

  warehouseEventHander(){
    this.WarehouseStatus = false;
  }

  openWarehouseFromLookup(){
    this.warehouseCode = 'From';
    this.WarehouseStatus = true;
  }

  openWarehouseToLookup(){
    this.warehouseCode = 'To';
    this.WarehouseStatus = true;
  }

  warehouseCodeEventHander(e){
    if(this.warehouseCode == 'From'){
      this.WarehouseFrom = e;
    }if(this.warehouseCode == 'To'){
      this.WarehouseTo = e;
    } 
  }

  processData(){
    this.gridData = '';
    this.bomGrid = false;
    this.SimpleGridEnableLoader = true;
    if(!this.ItemCodeFrom && !this.ItemCodeTo && !this.WarehouseFrom && !this.WarehouseTo){
      this.ItemCodeFrom = '';
      this.ItemCodeTo = '';
      this.WarehouseFrom = '';
      this.WarehouseTo = '';
    }else if((this.ItemCodeFrom && !this.ItemCodeTo)){
      this.ItemCodeTo = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: 'Item To Required',
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if((this.ItemCodeTo && !this.ItemCodeFrom)){
      this.ItemCodeFrom = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: 'Item From Required',
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if(this.WarehouseFrom && !this.WarehouseTo){
      this.WarehouseTo = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: 'Warehouse To Required',
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if((this.WarehouseTo && !this.WarehouseFrom)){
      this.WarehouseFrom = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: 'Warehouse From Required',
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if(this.ItemCodeFrom && this.ItemCodeTo && !this.WarehouseFrom && !this.WarehouseTo){
      this.WarehouseFrom = '';
      this.WarehouseTo = '';
    }else if(!this.ItemCodeFrom && !this.ItemCodeTo && this.WarehouseFrom && this.WarehouseTo){
      this.ItemCodeFrom = '';
      this.ItemCodeTo = '';
    }

    if(this.ItemCodeFrom != undefined && this.ItemCodeTo != undefined && this.WarehouseFrom != undefined && this.WarehouseTo != undefined){
    this.BOMService.GetItemExplosionData(environment.optiProDashboardAPIURL, this.CompanyDB, this.ItemCodeFrom, this.ItemCodeTo, this.WarehouseFrom, this.WarehouseTo, this.IsPrimary).subscribe(
      data => {
        this.gridData = data;
        console.log(this.gridData);
        this.SimpleGridEnableLoader = false;
        if(this.gridData.length==0){
          this.bomGrid = false;
          this.notificationService.show({
            content: 'No Record Found',
            hideAfter: 3000,
            position: { horizontal: 'right', vertical: 'top' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'error', icon: false }
           // closable: true
          });
        }else{
          this.bomGrid = true;
        }
      },
      error => {
        this.SimpleGridEnableLoader = false;
        this.bomGrid = false;
      })
    }
  }

  refreshEvent(e){
    if(e.target.checked == true){
      this.refreshStatus = true;
    }else{
      this.refreshStatus = false;
      this.time = '';
      this.value = '';
      this.hours = '';
      this.minutes = '';
      this.seconds = '';
      clearInterval(this.myVar);
    }
   }

   countdown(endDate) {
    clearInterval(this.myVar);
    let countDownDate = new Date(endDate).getTime();
    this.myVar = setInterval(() => {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.hours = ("0" + hours).slice(-2)+":";
    this.minutes = ("0" + minutes).slice(-2)+":";
    this.seconds = ("0" + seconds).slice(-2);
    if (distance < 0) {
      this.hours = "";
      this.minutes = "";
      this.seconds = "";
      clearInterval(this.myVar);
      var processButton = document.getElementById("process");
      processButton.click(); 
      var autoRefreshButton = document.getElementById("start");
      autoRefreshButton.click(); 
    }
    }, 1000);   
}

autoRefresh(){
  var selectTime = new Date(this.value);
  var minute = selectTime.getMinutes();
  var hour = selectTime.getHours();
  var currentTime = new Date();
  currentTime.setHours( currentTime.getHours() + hour );
  currentTime.setMinutes( currentTime.getMinutes() + minute );
  this.hour = this.datePipe.transform(currentTime, 'medium');
  if(this.hour){
    this.countdown(this.hour); 
  }
}


}
