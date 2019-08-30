import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BOMService } from '../service/bom.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-warehouse-code-lookup',
  templateUrl: './warehouse-code-lookup.component.html',
  styleUrls: ['./warehouse-code-lookup.component.scss']
})
export class WarehouseCodeLookupComponent implements OnInit {

  @Output() warehouseEvent = new EventEmitter<string>();
  @Output() warehouseCodeEvent = new EventEmitter<any>();
  public WarehouseData: any;
  public CompanyDB: any;

  constructor(private BOMService: BOMService) { }

  ngOnInit() {
    this.CompanyDB = 'OPTIPRO129';
    this.getWarehouseData(environment.optiProDashboardAPIURL, this.CompanyDB);
  }

  close(){
    this.warehouseEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.warehouseCodeEvent.emit(evt.selectedRows[0].dataItem.WhsCode);
    this.close();
  }

  getWarehouseData(api, companyDB){
    this.BOMService.GetWarehouseList(api, companyDB).subscribe(
      data => {
        this.WarehouseData = data;
      });    
  } 

}
