import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GanttChartService } from '../service/gantt-chart.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { RowArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-plan-order',
  templateUrl: './plan-order.component.html',
  styleUrls: ['./plan-order.component.scss']
})
export class PlanOrderComponent implements OnInit {

  
  @Output() lookupEvent = new EventEmitter<string>();
  @Output() PlanDefinitionOrderNoEvent = new EventEmitter<any>();
  @Input() planOrderData: any;
  @Input() PlanOrderSelect: any;
  public itemCode: any;
  public EnableLoader: boolean = true;
  isColumnFilter: boolean = false;
  public language: any;
  public isPlanOrderSelected: any;

  constructor(private GanttChartService: GanttChartService) { }

  
  ngOnInit() {
    this.language = JSON.parse(window.localStorage.getItem('language'));
    this.EnableLoader = false;
    let select = [];
    if(this.PlanOrderSelect){
      select.push(this.PlanOrderSelect);
      this.isPlanOrderSelected = (e: RowArgs) => select.indexOf(e.dataItem.OPTM_SUPPLLY_ID) >=0 ;
    }else{
      this.isPlanOrderSelected = (e: RowArgs) => select.indexOf(e.dataItem.OPTM_SUPPLLY_ID) >=0 ;
    }
  }

  close(){
    this.lookupEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.PlanDefinitionOrderNoEvent.emit(evt.selectedRows[0].dataItem.OPTM_SUPPLLY_ID);
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
