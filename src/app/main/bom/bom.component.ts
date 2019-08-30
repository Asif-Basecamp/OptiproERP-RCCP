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
  public itemCode: any;
  public ItemCodeFrom: any;
  public ItemCodeTo: any;
  public DateFrom: any;
  public DateTo: any;

  constructor(private BOMService: BOMService) { }

  ngOnInit() {
    this.CompanyDB = 'OPTIPRO129';
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

  processData(){
    this.gridData = '';
    this.bomGrid = false;
    this.BOMService.GetItemExplosionData(environment.optiProDashboardAPIURL, this.CompanyDB, this.ItemCodeFrom, this.ItemCodeTo, this.DateFrom, this.DateTo).subscribe(
      data => {
        this.bomGrid = true;
        this.gridData = data;
      },
      error => {
        
    })
  }

}
