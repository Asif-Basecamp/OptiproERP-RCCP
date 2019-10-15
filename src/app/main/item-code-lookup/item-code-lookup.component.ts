import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { TranslateService } from '@ngx-translate/core';
import { RowArgs } from '@progress/kendo-angular-grid';
import { BOMService } from 'src/app/services/bom.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from 'src/app/core/language.service';

@Component({
  selector: 'app-item-code-lookup',
  templateUrl: './item-code-lookup.component.html',
  styleUrls: ['./item-code-lookup.component.scss']
})
export class ItemCodeLookupComponent implements OnInit {

  @Output() lookupEvent = new EventEmitter<string>();
  @Output() itemCodeEvent = new EventEmitter<any>();
  @Input() ItemData: any;
  public itemCode: any;
  public EnableLoader: boolean = true;
  isColumnFilter: boolean = false;
  
  constructor(private LanguageService: LanguageService, private BOMService: BOMService, private translate: TranslateService) {}

  
  ngOnInit() {
    this.LanguageService.languageSet(this.translate, environment.language);
    this.EnableLoader = false;
  }
  
  close(){
    this.lookupEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.itemCodeEvent.emit(evt.selectedRows[0].dataItem.ItemCode);
    this.close();
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
    this.clearFilters();
    this.isColumnFilter = false
  }
}
