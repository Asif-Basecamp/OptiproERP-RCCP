import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BOMService } from '../service/bom.service';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

export interface TreeNode {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
}

@Component({
  selector: 'app-bom-grid-view',
  templateUrl: './bom-grid-view.component.html',
  styleUrls: ['./bom-grid-view.component.scss']
})
export class BOMGridViewComponent implements OnInit {

  @Input() gridDataEvent;
  @Input() primaryEvent;
  public CompanyDB: any;
  files2: TreeNode[];
  public nodes2: any = []; 
  public datas: any = [];
  public BomDetail: any;
  public headerData: any;
  public DetailGridStatus: boolean = false;
  public BOMDetailStatus: boolean = false;
  public RoutingHeaderStatus: boolean = false;

  constructor(private BOMService: BOMService, private translate: TranslateService) {}
  
  ngOnInit() {
    this.CompanyDB = 'QAS2129IR1';
  }

  /*-- on click simple Grid Row--*/

  simpleGridRowSelect(evt){
    this.DetailGridStatus = true;
    this.BomDetail = '';
    if(evt.selectedRows[0].dataItem){
      this.detailGridData(evt.selectedRows[0].dataItem, this.CompanyDB);
    }
  }

  /*--Get Detail Grid data --*/

  getHierarchy(dataa, Seq){
    let node = [];
    dataa.filter(function(d){
      if(d.data.ParantId == Seq){
        return d.data.ParantId == Seq
      }
    }).forEach(function(d){
     var cd = d;
     cd.children = this.getHierarchy(dataa, d.data.SeqNo);
     return node.push(cd);
   }.bind(this))
    return node;
  }

  detailGridData(GridViewdata, db){
    this.BOMService.GetBOMDetailedData(environment.optiProDashboardAPIURL, db, GridViewdata.U_O_ITEMCODE, 
      GridViewdata.CreateDate, GridViewdata.Code, GridViewdata.U_O_BOM_SEQ, GridViewdata.U_O_WHSECODE, 
      GridViewdata.U_O_REVISION, this.primaryEvent).subscribe(
      data => {
        if(data.length > 0){
            let Arr = [];
            for(var i=0; i<data.length; i++){
             if(data[i]){
                 Arr.push({data : data[i]});
             }
            } 
            this.DetailGridStatus = false;
            this.nodes2 = this.getHierarchy(Arr, '-1');
            this.files2 = this.nodes2;
          }
      },
      error => {})
  }

  /*-- On click Detail Grid Row --*/
  DetailGridRowSelect(e){
    this.BOMDetailStatus = true;
    this.datas = [];
    if(e.parent == null){
      this.headerData = e.data;
      this.getBOMDetail(e.data.Code);
    }else{
      this.BOMDetailStatus = false;
      this.BomDetail = '';
    }
  }

  /*-- Get BOM DEtail --*/
  getBOMDetail(code){
    this.BOMService.GetBOMDetail(environment.optiProDashboardAPIURL, this.CompanyDB, code).subscribe(
      data => {
        this.BomDetail = data;
        this.BOMDetailStatus = false;
        this.getRoutingHeaderDetail(this.BomDetail[0].BOM_ITEMCODE);
    }); 
  }

  /*-- get Routing header data , Line Data, Resource Data --*/
  getRoutingHeaderDetail(ItemCode){
    this.RoutingHeaderStatus = true;
    this.datas = [];
    this.BOMService.GetRoutingHeaderDetail(environment.optiProDashboardAPIURL, this.CompanyDB, ItemCode, this.primaryEvent).subscribe(
      headerdata => {
        for(let i=0;i< headerdata.length; i++){
          this.BOMService.GetRoutingLineDetail(environment.optiProDashboardAPIURL, this.CompanyDB, headerdata[i].Code).subscribe(
            Linedata => {
              headerdata[i]["LineDetail"] = Linedata;
              for(let j=0;j< headerdata[i].LineDetail.length; j++){
                this.BOMService.GetResourceDetail(environment.optiProDashboardAPIURL, this.CompanyDB, headerdata[i].LineDetail[j].Code, headerdata[i].LineDetail[j].U_O_LINE_NO).subscribe(
                ResourceData => {
                  headerdata[i].LineDetail[j]["ResourceDetail"] = ResourceData;
                });
              } 
               this.datas.push(headerdata[i]);
               this.RoutingHeaderStatus = false;
          });
        }
    });
  }
}
