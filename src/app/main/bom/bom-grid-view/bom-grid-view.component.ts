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
  @Input() primaryEvent;
  public detailGridEnableLoader: boolean = false;
  public BOMEnableLoader: boolean = false;
  public RoutingHeaderEnableLoader: boolean = false;
  public RoutingLineEnableLoader: boolean = false;
  public ResourceEnableLoader: boolean = false;
  public datas: any = [];

  constructor(private BOMService: BOMService, private translate: TranslateService) {}
  
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
    this.detailGridEnableLoader = true;
    this.BOMService.GetBOMDetailedData(environment.optiProDashboardAPIURL, db, GridViewdata.U_O_ITEMCODE, 
      GridViewdata.CreateDate, GridViewdata.Code, GridViewdata.U_O_BOM_SEQ, GridViewdata.U_O_WHSECODE, 
      GridViewdata.U_O_REVISION, this.primaryEvent).subscribe(
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
            this.detailGridEnableLoader = false;
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
    this.BOMEnableLoader = true;
    if(e.parent == null){
      this.BOMDetailShow = true;
      this.Code = e.data.Code;
      this.BOMService.GetBOMDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.Code).subscribe(
        data => {
          this.BomDetail = data;
          this.BOMEnableLoader = false;
      }); 
    }
  }

  RoutingHeaderSelect(evt){
    this.ItemCode = '';
    this.RoutingHeaderDetailShow = false;
    this.RoutingHeaderEnableLoader = true;
    this.datas = [];
    if(evt.dataItem.BOM_ITEMCODE){
      this.RoutingHeaderDetailShow = true;
      this.ItemCode = evt.dataItem.BOM_ITEMCODE;
      this.BOMService.GetRoutingHeaderDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.ItemCode, this.primaryEvent).subscribe(
        headerdata => {
          this.RoutingHeaderDetail = headerdata;
          for(let i=0;i< this.RoutingHeaderDetail.length; i++){
            this.BOMService.GetRoutingLineDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.RoutingHeaderDetail[i].Code).subscribe(
              Linedata => {
                this.RoutingHeaderDetail[i]["LineDetail"] = Linedata;
                for(let j=0;j< this.RoutingHeaderDetail[i].LineDetail.length; j++){
                  this.BOMService.GetResourceDetail(environment.optiProDashboardAPIURL, this.CompanyDB, this.RoutingHeaderDetail[i].LineDetail[j].Code, this.RoutingHeaderDetail[i].LineDetail[j].U_O_LINE_NO).subscribe(
                  ResourceData => {
                    this.RoutingHeaderDetail[i].LineDetail[j]["ResourceDetail"] = ResourceData;
                    this.RoutingHeaderEnableLoader = false;
                  });
                } 
                 this.datas.push(this.RoutingHeaderDetail[i]);
            });
          }
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
        this.ResourceEnableLoader = false;
    });
  }

  gridHeaderRowSelect(evt){
    this.RoutingLineDetail = '';
    this.ResourceDetail = '';
    this.RoutingLineEnableLoader = true;
    if(evt.dataItem){
      this.BOMService.GetRoutingLineDetail(environment.optiProDashboardAPIURL, this.CompanyDB, evt.dataItem.Code).subscribe(
        data => {
          this.RoutingLineDetail = data;
          this.RoutingLineEnableLoader = false;
      }); 
    }
  }

  gridLineRowSelect(evt){
    this.ResourceDetail = '';
    this.ResourceEnableLoader = true;
    if(evt.dataItem){
      this.getResourceDetail(evt.dataItem);
    }
  }
}
