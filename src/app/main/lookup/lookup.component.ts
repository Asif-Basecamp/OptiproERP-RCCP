import { Component, OnInit, setTestabilityGetter, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ColumnSetting } from 'src/app/core/data/CommonData';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {
  @ViewChild("lookupsearch", { static: true }) _el: ElementRef;
  @Input() serviceData: any;
  @Input() lookupfor: any;
  @Input() fillLookupArray: any;
  @Input() selectedImage: any
  @Output() lookupvalue = new EventEmitter();
  @Output() lookupkey = new EventEmitter();
  @Input() ruleselected: any;
  @ViewChild('myInput', { static: true })
  myInputVariable: ElementRef;
  public table_head: ColumnSetting[] = [];
  dialogOpened: boolean = true;
  lookupTitle: string;
  pagable: boolean = false;
  pagesize: number;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  grid: any;
  showSelection: boolean = false;
  selectedValues: Array<any> = [];
  public mySelection: number[] = [];
  public language: any;

  constructor(private router: Router) {
    this.language = JSON.parse(window.localStorage.getItem('language'));
  }

  close() {
    this.dialogOpened = false;
  }

  public state: State = {
    skip: 0,
    take: 5,
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public clearFilters() {
    this.state.filter = {
      logic: 'and',
      filters: []
    };
  }
  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }
  clearFilter(grid: GridComponent) {
    this.clearFilters()
  }
  ngOnInit() {
   
  }


  async ngOnChanges(): Promise<void> {

    if (this.lookupfor == "showCompleteLookup") {
      this.showCompleteLookup();
    } else if (this.lookupfor == "showIssuedLookup") {
       this.showIssuedLookup();
    } else if (this.lookupfor == "showOnOrderLookup") {
      this.showOnOrderLookup();
    } 
    else if(this.lookupfor == "showInStockLookup"){
      this.showInStockLookup();
    }
    else if(this.lookupfor == "showCommittedLookup"){
      this.showCommittedLookup();
    }
    this.clearFilters();
    this.isColumnFilter = false
  }

  showCompleteLookup() {
    this.table_head = [
      {
        field: 'SNO',
        title: '#',
        type: 'text',
        width: '20'
      },
      {
        field: 'OPTM_BTCHSERNO',
        title: this.language.serial_Batch_number,
        type: 'text',
        width: '100'
      },
      {
        field: 'OPTM_QUANTITY',
        title: this.language.quantity_accept,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'REJECTEDQTY',
        title: this.language.quantity_rejected,
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = this.language.quantity_completed;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  showInStockLookup(){
    this.table_head = [
      {
        field: 'SNO',
        title: '#',
        type: 'text',
        width: '20'
      },
      {
        field: 'BATCHSERNO',
        title: this.language.serial_Batch_number,
        type: 'text',
        width: '100'
      },
      {
        field: 'WhsCode',
        title: this.language.issue_warehouse,
        type: 'text',
        width: '100'
      },
      
      {
        field: 'QUANTITY',
        title: this.language.Quantity,
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = this.language.In_Stock;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }


  showIssuedLookup() {
    this.table_head = [
      {
        field: 'SNO',
        title: '#',
        type: 'text',
        width: '20'
      },
      {
        field: 'DistNumber',
        title: this.language.serial_Batch_number,
        type: 'text',
        width: '100'
      },
      {
        field: 'Warehouse',
        title: this.language.issue_warehouse,
        type: 'text',
        width: '100'
      },
      {
        field: 'BinCode',
        title: this.language.Issue_bin,
        type: 'text',
        width: '100'
      },
      {
        field: 'Quantity',
        title: this.language.Issue_Quantity,
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = this.language.Quantity_Issued;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  showOnOrderLookup() {
    this.table_head = [
      {
        field: 'DOCNUM',
        title: 'PO#',
        type: 'text',
        width: '100'
      },
      {
        field: 'VENDOR',
        title: this.language.Vendor,
        type: 'text',
        width: '100'
      },
      {
        field: 'WHCODE',
        title: this.language.Warehouse,
        type: 'text',
        width: '100'
      },
      {
        field: 'UOM',
        title: this.language.UOM,
        type: 'text',
        width: '100'
      },
      {
        field: 'ORDERED_QTY',
        title: this.language.Quantity_Ordered,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'RECEIVE_QTY',
        title: this.language.Quantity_Received,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'RECV_DATE',
        title: this.language.Receive_Date,
        type: 'text',
        width: '100',
        format: '{0: MM/dd/yyyy}'
      }];
    this.lookupTitle = this.language.Quantity_On_Order;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  showCommittedLookup() {
    this.table_head = [
      {
        field: 'ORDERED_QTY',
        title: this.language.Ordered_Quantity,
        type: 'text',
        width: '100'
      },
      {
        field: 'RECEIVE_QTY',
        title: this.language.Received_Quantity,
        type: 'text',
        width: '100'
      },
      {
        field: 'VENDOR',
        title: this.language.Vendor,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'UOM',
        title: this.language.UOM,
        type: 'text',
        width: '100',
        class: 'text-right'
      }      
    ];
    this.lookupTitle = this.language.Quantity_Committed;
    if (this.serviceData !== undefined) {
      if (this.serviceData.length > 0) {
        this.dialogOpened = true;
      }
    }
  }

  
  on_item_select(selection) {
    if (!this.showSelection) {
      const lookup_key = selection.selectedRows[0].dataItem;
      this.lookupkey.emit(lookup_key);
      this.lookupvalue.emit(Object.values(lookup_key));
      selection.selectedRows = [];
      selection.index = 0;
      selection.selected = false;
      this.serviceData = [];
      this.dialogOpened = false;
    }
  }



  onCheckboxClick(checked: any, index: number) {

    let servivceItem: any = this.serviceData[index];
    if (checked) {
      this.selectedValues.push(servivceItem);
    }
    else {
      // let rixd: number= this.selectedValues.findIndex(i => i.LOTNO == servivceItem.LOTNO && i.LOTNO == servivceItem.BINNO)
      this.selectedValues = this.selectedValues.splice(index, 1);
    }
  }




  Done() {
    this.lookupkey.emit(this.selectedValues);
    this.dialogOpened = false;
  }


}
