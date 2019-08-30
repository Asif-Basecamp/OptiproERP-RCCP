import { Component, OnInit } from '@angular/core';
import { BOMService } from './service/bom.service';
import { environment } from '../../../environments/environment';

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
  public ItemCodeFrom: any;
  public ItemCodeTo: any;
  public WarehouseFrom: any;
  public WarehouseTo: any;
  public IsPrimary: any = 'Y';
  myVar1 = true;

  constructor(private BOMService: BOMService) { }

  ngOnInit() {
    this.CompanyDB = 'OPTIPRO129';
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
    this.itemCode = 'From';
    this.lookupStatus = true;
  }

  openItemCodeToLookup(){
    this.itemCode = 'To';
    this.lookupStatus = true;
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
    this.BOMService.GetItemExplosionData(environment.optiProDashboardAPIURL, this.CompanyDB, this.ItemCodeFrom, this.ItemCodeTo, this.WarehouseFrom, this.WarehouseTo, this.IsPrimary).subscribe(
      data => {
        this.bomGrid = true;
        this.gridData = data;
      },
      error => {
        
    })
  }

}
