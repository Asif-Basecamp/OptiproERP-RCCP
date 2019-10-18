import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BOMService } from 'src/app/services/bom.service';
import { RowArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  @Output() warehouseEvent = new EventEmitter<string>();
  @Output() warehouseCodeEvent = new EventEmitter<any>();
  @Input() WarehouseData: any;
  @Input() WarehouseFromSelect: any;
  @Input() WarehouseToSelect: any;
  public CompanyDB: any;
  public EnableLoader: boolean = true;
  public language: any;
  public isWarehouseCodeSelected: any;

  constructor(private BOMService: BOMService) { }

  ngOnInit() {
    this.language = JSON.parse(window.localStorage.getItem('language'));
    this.EnableLoader = false;
    let select = [];
    if(this.WarehouseFromSelect){
      select.push(this.WarehouseFromSelect);
      this.isWarehouseCodeSelected = (e: RowArgs) => select.indexOf(e.dataItem.WhsCode) >=0 ;
    }else{
      this.isWarehouseCodeSelected = (e: RowArgs) => select.indexOf(e.dataItem.WhsCode) >=0 ;
    }

    if(this.WarehouseToSelect){
      select.push(this.WarehouseToSelect);
      this.isWarehouseCodeSelected = (e: RowArgs) => select.indexOf(e.dataItem.WhsCode) >=0 ;
    }else{
      this.isWarehouseCodeSelected = (e: RowArgs) => select.indexOf(e.dataItem.WhsCode) >=0 ;
    }
  }

  close(){
    this.warehouseEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.warehouseCodeEvent.emit(evt.selectedRows[0].dataItem.WhsCode);
    this.close();
  }

}
