import { Component, OnInit, setTestabilityGetter, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { ColumnSetting } from 'src/app/core/data/CommonData';
import { LanguageService } from 'src/app/core/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

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
  public serial_Batch_number: any;
  public quantity_accept: any;
  public quantity_rejected: any;
  public quantity_completed: any;
  public issue_warehouse: any;
  public Quantity: any;
  public In_Stock: any;
  public Vendor: any;
  public Quantity_Committed: any;
  public UOM: any;
  public Received_Quantity: any;
  public Ordered_Quantity: any;
  public Quantity_On_Order: any;
  public Receive_Date: any;
  public Quantity_Received: any;
  public Quantity_Ordered: any;
  public Warehouse: any;
  public Quantity_Issued: any;
  public Issue_Quantity: any; 
  public Issue_bin: any;

  constructor(private LanguageService: LanguageService, private translate: TranslateService, private router: Router) {
  }

  ngOnInit() {
    this.LanguageService.languageSet(this.translate, environment.language);
    this.translate.get('serial_Batch_number').subscribe((text:string) => {
      this.serial_Batch_number = text;
     }); 
     this.translate.get('quantity_accept').subscribe((text:string) => {
      this.quantity_accept = text;
     }); 
     this.translate.get('quantity_rejected').subscribe((text:string) => {
      this.quantity_rejected = text;
     });
     this.translate.get('quantity_completed').subscribe((text:string) => {
      this.quantity_completed = text;
     }); 
     this.translate.get('issue_warehouse').subscribe((text:string) => {
      this.issue_warehouse = text;
     });
     this.translate.get('Quantity').subscribe((text:string) => {
      this.Quantity = text;
     });
     this.translate.get('In_Stock').subscribe((text:string) => {
      this.In_Stock = text;
     });
     this.translate.get('Vendor').subscribe((text:string) => {
      this.Vendor = text;
     });
     this.translate.get('Quantity_Committed').subscribe((text:string) => {
      this.Quantity_Committed = text;
     });
     this.translate.get('UOM').subscribe((text:string) => {
      this.UOM = text;
     });
     this.translate.get('Received_Quantity').subscribe((text:string) => {
      this.Received_Quantity = text;
     });
     this.translate.get('Ordered_Quantity').subscribe((text:string) => {
      this.Ordered_Quantity = text;
     });
     this.translate.get('Quantity_On_Order').subscribe((text:string) => {
      this.Quantity_On_Order = text;
     });
     this.translate.get('Receive_Date').subscribe((text:string) => {
      this.Receive_Date = text;
     });
     this.translate.get('Quantity_Received').subscribe((text:string) => {
      this.Quantity_Received = text;
     });
     this.translate.get('Quantity_Ordered').subscribe((text:string) => {
      this.Quantity_Ordered = text;
     });
     this.translate.get('Warehouse').subscribe((text:string) => {
      this.Warehouse = text;
     });
     this.translate.get('Quantity_Issued').subscribe((text:string) => {
      this.Quantity_Issued = text;
     });
     this.translate.get('Issue_Quantity').subscribe((text:string) => {
      this.Issue_Quantity = text;
     });
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
        title: this.serial_Batch_number,
        type: 'text',
        width: '100'
      },
      {
        field: 'OPTM_QUANTITY',
        title: this.quantity_accept,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'REJECTEDQTY',
        title:  this.quantity_rejected,
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = this.quantity_completed;
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
        title: this.serial_Batch_number,
        type: 'text',
        width: '100'
      },
      {
        field: 'WhsCode',
        title: this.issue_warehouse,
        type: 'text',
        width: '100'
      },
      
      {
        field: 'QUANTITY',
        title: this.Quantity,
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = this.In_Stock;
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
        title: this.serial_Batch_number,
        type: 'text',
        width: '100'
      },
      {
        field: 'Warehouse',
        title: this.issue_warehouse,
        type: 'text',
        width: '100'
      },
      {
        field: 'BinCode',
        title: this.Issue_bin,
        type: 'text',
        width: '100'
      },
      {
        field: 'Quantity',
        title: this.Issue_Quantity,
        type: 'text',
        width: '100',
        class: 'text-right'
      }
      
    ];
    this.lookupTitle = this.Quantity_Issued;
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
        title: this.Vendor,
        type: 'text',
        width: '100'
      },
      {
        field: 'WHCODE',
        title: this.Warehouse,
        type: 'text',
        width: '100'
      },
      {
        field: 'UOM',
        title: this.UOM,
        type: 'text',
        width: '100'
      },
      {
        field: 'ORDERED_QTY',
        title: this.Quantity_Ordered,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'RECEIVE_QTY',
        title: this.Quantity_Received,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'RECV_DATE',
        title: this.Receive_Date,
        type: 'text',
        width: '100',
        format: '{0: MM/dd/yyyy}'
      }];
    this.lookupTitle = this.Quantity_On_Order;
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
        title: this.Ordered_Quantity,
        type: 'text',
        width: '100'
      },
      {
        field: 'RECEIVE_QTY',
        title: this.Received_Quantity,
        type: 'text',
        width: '100'
      },
      {
        field: 'VENDOR',
        title: this.Vendor,
        type: 'text',
        width: '100',
        class: 'text-right'
      },
      {
        field: 'UOM',
        title: this.UOM,
        type: 'text',
        width: '100',
        class: 'text-right'
      }      
    ];
    this.lookupTitle = this.Quantity_Committed;
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
      this.selectedValues = this.selectedValues.splice(index, 1);
    }
  }

  Done() {
    this.lookupkey.emit(this.selectedValues);
    this.dialogOpened = false;
  }

}
