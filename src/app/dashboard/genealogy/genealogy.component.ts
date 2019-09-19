import { Component, OnInit, TemplateRef, Input  } from '@angular/core';
import { GenealogyService } from 'src/app/services/genealogy.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import OrgChart from 'src/app/core/org-chart/orgchart.js';
import { RowArgs } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Injector } from '@angular/core';
import { ServiceLocator } from 'src/app/core/servicelocator';
import { LocalStorageService } from 'src/app/core/services/localstorage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-genealogy',
  templateUrl: './genealogy.component.html',
  styleUrls: ['./genealogy.component.scss']
})
export class GenealogyComponent implements OnInit {

  public lookup: boolean = false;
  public ItemData: any;
  public CompanyDB: any;
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];
  options = {};

  constructor(private translate: TranslateService, private genealogyService: GenealogyService, private router: Router, private localStorageService: LocalStorageService, private injector: Injector) { 
    let userLang: string = this.localStorageService.getCurrentLanguage();
    translate.use(userLang);
    ServiceLocator.injector = this.injector;
  }

  ngOnInit() {
    this.CompanyDB = JSON.parse(localStorage.getItem('CompanyDB'));
    let PrcrmntMtd = "'B','M'";
    this.getItemData(environment.optiProDashboardAPIURL, this.CompanyDB, PrcrmntMtd);
  }

  getItemData(api, companyDB, PrcrmntMtd){
    this.genealogyService.GetItemList(api, companyDB, PrcrmntMtd).subscribe(
      data => {
        this.ItemData = data;
      });    
  } 

  openItemCodeFromLookup(){
    this.lookup = true;
  }

  lookupCloseEvent(){
    this.lookup = false;
  }

  onItemCodeBlur(){
   /* let item = this.ItemValue;
    if(this.DfltWarehouse){
       this.showValidation = true;
    }
    let itemCode = [];
    if(item){
     if(this.vendor){
       for(var i in this.vendorData){
         if(item === this.vendorData[i].ItemCode){
           itemCode.push(this.vendorData[i]);
         }
       }
     }
     else {
       for(var i in this.ItemCodeData){
         if(item === this.ItemCodeData[i].ItemCode){
           itemCode.push(this.ItemCodeData[i]);
         }
       }
     }
      
      if(itemCode.length>0){
        this.ItemDesc = itemCode[0].ItemName;
        this.ItemValue = itemCode[0].ItemCode;
        if (itemCode[0].ManBtchNum == 'Y') {
          this.trackName = 'Batch'
         } else {
          this.trackName = 'Serial'
         }
        this.disableLotNumber = false;
        this.itemStatus = false;
        
      }else{
        this.ItemDesc = '';
        this.itemStatus = true;
        this.disableLotNumber = true;
        this.DfltWarehouse = '';
        this.DistNumFrom = '';
        this.DistNumTo = '';
      }
    }else{
        this.itemStatus = false;
        this.ItemDesc = '';
        this.DfltWarehouse = '';
        this.DistNumFrom = '';
        this.DistNumTo = '';
    }*/ 
  }
 
  
  }