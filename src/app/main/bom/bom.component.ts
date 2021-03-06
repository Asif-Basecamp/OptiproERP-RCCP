import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BOMService } from './service/bom.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { CountdownComponent } from 'ngx-countdown';
import { DatePipe } from '@angular/common';
import { RowArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.scss']
})
export class BOMComponent implements OnInit {
  
  public isMobile:boolean;
  public seachPanelCollapse:boolean;
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
  public ItemFromStatus:boolean = false;
  public ItemToStatus:boolean = false;
  public WarehouseFromStatus:boolean = false;
  public WarehouseToStatus:boolean = false;
  public arrConfigData: any;
  public language: any;
  public ItemCodeFromSelect: any;
  public ItemCodeToSelect: any;
  public WarehouseFromSelect: any;
  public WarehouseToSelect: any;

  constructor(private BOMService: BOMService, private notificationService: NotificationService, private datePipe: DatePipe) { }  
  @HostListener('window:resize', ['$event']) onResize() {
    this.mobileView();
  }
  ngOnInit() {
    this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));
    this.language = JSON.parse(window.localStorage.getItem('language'));
    this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
    this.getItemData(this.arrConfigData.service_url, this.CompanyDB);
    this.getWarehouseData(this.arrConfigData.service_url, this.CompanyDB);
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


  onItemFromBlur(){
    let ItemFrom = this.ItemCodeFrom;
    let ItemFromArray = [];
    if(ItemFrom){
      for(var i in this.ItemData){
        if(ItemFrom === this.ItemData[i].ItemCode){
          ItemFromArray.push(this.ItemData[i]);
        }
      }
      if(ItemFromArray.length>0){
        this.ItemFromStatus = false;
      }else{
        this.ItemFromStatus = true;
      }
    }else{
        this.ItemFromStatus = false;
    } 
  }

  onItemToBlur(){
    let ItemTo = this.ItemCodeTo;
    let ItemToArray = [];
    if(ItemTo){
      for(var i in this.ItemData){
        if(ItemTo === this.ItemData[i].ItemCode){
          ItemToArray.push(this.ItemData[i]);
        }
      }
      if(ItemToArray.length>0){
        this.ItemToStatus = false;
      }else{
        this.ItemToStatus = true;
      }
    }else{
        this.ItemToStatus = false;
    } 
  }

  onWarehouseFromBlur(){
    let WarehouseFrom = this.WarehouseFrom;
    let WarehouseFromArray = [];
    if(WarehouseFrom){
      for(var i in this.WarehouseData){
        if(WarehouseFrom === this.WarehouseData[i].WhsCode){
          WarehouseFromArray.push(this.WarehouseData[i]);
        }
      }
      if(WarehouseFromArray.length>0){
        this.WarehouseFromStatus = false;
      }else{
        this.WarehouseFromStatus = true;
      }
    }else{
        this.WarehouseFromStatus = false;
    } 
  }

  onWarehouseToBlur(){
    let WarehouseTo = this.WarehouseTo;
    let WarehouseToArray = [];
    if(WarehouseTo){
      for(var i in this.WarehouseData){
        if(WarehouseTo === this.WarehouseData[i].WhsCode){
          WarehouseToArray.push(this.WarehouseData[i]);
        }
      }
      if(WarehouseToArray.length>0){
        this.WarehouseToStatus = false;
      }else{
        this.WarehouseToStatus = true;
      }
    }else{
        this.WarehouseToStatus = false;
    } 
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
    this.ItemCodeToSelect = '';
    this.ItemCodeFromSelect = '';
    if(this.ItemCodeFrom && this.itemCode == 'From'){
      this.ItemCodeFromSelect = this.ItemCodeFrom;
      this.ItemFromStatus = false;
    }
  }

  openItemCodeToLookup(){
    this.lookupStatus = true;
    this.itemCode = 'To';
    this.ItemCodeFromSelect = '';
    this.ItemCodeToSelect = '';
    if(this.ItemCodeTo && this.itemCode == 'To'){
      this.ItemCodeToSelect = this.ItemCodeTo;
      this.ItemToStatus = false;
    }
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
    this.WarehouseToSelect = '';
    this.WarehouseFromSelect = '';
    if(this.WarehouseFrom && this.warehouseCode == 'From'){
      this.WarehouseFromSelect = this.WarehouseFrom;
      this.WarehouseFromStatus = false;
    }
  }

  openWarehouseToLookup(){
    this.warehouseCode = 'To';
    this.WarehouseStatus = true;
    this.WarehouseFromSelect = '';
    this.WarehouseToSelect = '';
    if(this.WarehouseTo && this.warehouseCode == 'To'){
      this.WarehouseToSelect = this.WarehouseTo;
      this.WarehouseToStatus = false;
    }
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
        content: this.language.ItemToRequired,
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if((this.ItemCodeTo && !this.ItemCodeFrom)){
      this.ItemCodeFrom = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: this.language.ItemFromRequired,
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if(this.WarehouseFrom && !this.WarehouseTo){
      this.WarehouseTo = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: this.language.WarehouseToRequired,
        hideAfter: 3000,
        position: { horizontal: 'right', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'error', icon: false }
      });
    }else if((this.WarehouseTo && !this.WarehouseFrom)){
      this.WarehouseFrom = undefined;
      this.SimpleGridEnableLoader = false;
      this.notificationService.show({
        content: this.language.WarehouseFromRequired,
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
    this.BOMService.GetItemExplosionData(this.arrConfigData.service_url, this.CompanyDB, this.ItemCodeFrom, this.ItemCodeTo, this.WarehouseFrom, this.WarehouseTo, this.IsPrimary).subscribe(
      data => {
        this.gridData = data;
        this.SimpleGridEnableLoader = false;
        if(this.gridData.length==0){
          this.bomGrid = false;
          this.notificationService.show({
            content: this.language.no_record_found,
            hideAfter: 3000,
            position: { horizontal: 'right', vertical: 'top' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'error', icon: false }
           // closable: true
          });
        }else{
          this.bomGrid = true;
          this.seachPanelCollapse = true;
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
