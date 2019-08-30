import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BOMService } from '../service/bom.service';
import { environment } from '../../../../environments/environment';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-item-code-lookup',
  templateUrl: './item-code-lookup.component.html',
  styleUrls: ['./item-code-lookup.component.scss']
})
export class ItemCodeLookupComponent implements OnInit {

  @Output() lookupEvent = new EventEmitter<string>();
  @Output() itemCodeEvent = new EventEmitter<any>();
  public ItemData: any;
  public CompanyDB: any;
  public itemCode: any;

  constructor(private BOMService: BOMService) {}

  close(){
    this.lookupEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.itemCodeEvent.emit(evt.selectedRows[0].dataItem.ItemCode);
    this.close();
  }

  ngOnInit() {
    this.CompanyDB = 'OPTIPRO129';
    this.getItemData(environment.optiProDashboardAPIURL, this.CompanyDB);
  }

  getItemData(api, companyDB){
    this.BOMService.GetItemList(api, companyDB).subscribe(
      data => {
        this.ItemData = data;
      });    
  } 

}
