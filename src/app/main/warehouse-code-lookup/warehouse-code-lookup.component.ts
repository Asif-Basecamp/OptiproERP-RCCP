import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BOMService } from 'src/app/services/bom.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from 'src/app/core/language.service';

@Component({
  selector: 'app-warehouse-code-lookup',
  templateUrl: './warehouse-code-lookup.component.html',
  styleUrls: ['./warehouse-code-lookup.component.scss']
})
export class WarehouseCodeLookupComponent implements OnInit {

  @Output() warehouseEvent = new EventEmitter<string>();
  @Output() warehouseCodeEvent = new EventEmitter<any>();
  @Input() WarehouseData: any;
  public CompanyDB: any;
  public EnableLoader: boolean = true;

  constructor(private LanguageService: LanguageService, private BOMService: BOMService, private translate: TranslateService) { }

  ngOnInit() {
    this.EnableLoader = false;
    this.LanguageService.languageSet(this.translate, environment.language);
  }

  close(){
    this.warehouseEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.warehouseCodeEvent.emit(evt.selectedRows[0].dataItem.WhsCode);
    this.close();
  }

}
