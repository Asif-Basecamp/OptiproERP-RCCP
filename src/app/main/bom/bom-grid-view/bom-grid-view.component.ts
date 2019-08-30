import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BOMService } from '../service/bom.service';
import { environment } from '../../../../environments/environment';

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

  public gridData: any;
  public detailView: boolean = false;
  @Input() gridDataEvent;
  simpleGridData: any;
  public CompanyDB: any;
  public DetailViewData: any;
  files2: TreeNode[];
  public nodes2: any = []; 
  public BOMDetailShow: boolean = false;
  public RoutingHeaderDetailShow: boolean = false;
  public ItemCode: any;
  public Code: any;
  @Input() simpleGridEvent;
  @Input() CodeDetail;
  public BomDetail: any;
  @Input() ItemCodeDetail;
  public RoutingHeaderDetail: any; 
  public RoutingLineDetail: any;
  public ResourceDetail: any;
 
  constructor(private BOMService: BOMService) {}
  
  ngOnInit() {
    this.gridData = this.gridDataEvent;
    this.CompanyDB = 'OPTIPRO129';
  }

  simpleGridRowSelect(evt){
    this.BomDetail = '';
    this.BOMDetailShow = false;
    this.RoutingHeaderDetail = '';
    this.RoutingHeaderDetailShow = false;
    this.RoutingLineDetail = '';
    this.ResourceDetail = '';
    if(evt.selectedRows[0].dataItem){
      this.detailView = true;
      this.simpleGridData = evt.selectedRows[0].dataItem;
      this.detailGridData(this.simpleGridData, this.CompanyDB);
    }
  }

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
    this.BOMService.GetBOMDetailedData(environment.optiProDashboardAPIURL, db, GridViewdata.ItemCode, 
      GridViewdata.CreateDate, GridViewdata.Code, 
      GridViewdata.U_O_BOM_SEQ, GridViewdata.U_O_WHSECODE, GridViewdata.OnHand, GridViewdata.IsCommited, 
      GridViewdata.OnOrder, GridViewdata.AVAILABLE).subscribe(
      data => {
        this.DetailViewData = data;
        if(data.length > 0){
            let Arr = [];
            for(var i=0; i<this.DetailViewData.length; i++){
             if(this.DetailViewData[i]){
                 Arr.push({data : this.DetailViewData[i]});
             }
            } 
            this.nodes2 = this.getHierarchy(Arr, '-1');
            this.files2 = this.nodes2;
          }
      },
      error => {
        
    })
  }

  ItemRowSelect(e){
    this.Code = '';
    this.ResourceDetail = '';
    this.RoutingLineDetail = '';
    this.RoutingHeaderDetail = '';
    this.BOMDetailShow = false;
    this.RoutingHeaderDetailShow = false;
    if(e.parent == null){
      this.BOMDetailShow = true;
      this.Code = e.data.Code;
      this.BOMService.GetBOMDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.Code).subscribe(
        data => {
          this.BomDetail = data;
      }); 
    }
  }

  RoutingHeaderSelect(evt){
    this.ItemCode = '';
    this.RoutingHeaderDetailShow = false;
    if(evt.selectedRows[0].dataItem.BOM_ITEMCODE){
      this.RoutingHeaderDetailShow = true;
      this.ItemCode = evt.selectedRows[0].dataItem.BOM_ITEMCODE;
      this.BOMService.GetRoutingHeaderDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.ItemCode).subscribe(
        data => {
          this.RoutingHeaderDetail = data;
          this.getRoutingLineDetail(this.RoutingHeaderDetail);
      });
    }
  }

  getRoutingLineDetail(routingHeaderData){
    for(let i=0; i<routingHeaderData.length; i++){
      if(routingHeaderData[i].ROUTTYPE === 'Primary'){
        this.Code = routingHeaderData[i].Code;
        this.BOMService.GetRoutingLineDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.Code).subscribe(
          data => {
            this.RoutingLineDetail = data;
            this.getResourceDetail(this.RoutingLineDetail[0]);
        });
      }
    }
  }

  getResourceDetail(Linedata){
    this.BOMService.GetResourceDetail(environment.optiProDashboardAPIURL, this.CompanyDB, Linedata.Code, Linedata.U_O_LINE_NO).subscribe(
      data => {
        this.ResourceDetail = data;
    });
  }

  gridHeaderRowSelect(evt){
    this.RoutingLineDetail = '';
    this.ResourceDetail = '';
    if(evt.selectedRows[0].dataItem){
      this.BOMService.GetRoutingLineDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.Code).subscribe(
        data => {
          this.RoutingLineDetail = data;
          this.getResourceDetail(this.RoutingLineDetail[0]);
      }); 
    }
  }

  gridLineRowSelect(evt){
    this.ResourceDetail = '';
    if(evt.selectedRows[0].dataItem){
      this.getResourceDetail(evt.selectedRows[0].dataItem);
    }
  }
}
