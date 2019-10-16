import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { GanttChartService } from '../service/gantt-chart.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { RowArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-plan-definition',
  templateUrl: './plan-definition.component.html',
  styleUrls: ['./plan-definition.component.scss']
})
export class PlanDefinitionComponent implements OnInit {

  
  @Output() lookupEvent = new EventEmitter<string>();
  @Output() PlanDefinitionEvent = new EventEmitter<any>();
  @Input() planDefinitionData: any;
  @Input() PlanDefinitionSelect: any;
  public itemCode: any;
  public EnableLoader: boolean = true;
  isColumnFilter: boolean = false;
  public language: any;
  public isPlanDefinitionSelected: any;

  constructor(private GanttChartService: GanttChartService) { }

  ngOnInit() {
    this.language = JSON.parse(window.localStorage.getItem('language'));
    this.EnableLoader = false;
    let select = [];
    if(this.PlanDefinitionSelect){
      select.push(this.PlanDefinitionSelect);
      this.isPlanDefinitionSelected = (e: RowArgs) => select.indexOf(e.dataItem.Code) >=0 ;
    }else{
      this.isPlanDefinitionSelected = (e: RowArgs) => select.indexOf(e.dataItem.Code) >=0 ;
    }
  }

  close(){
    this.lookupEvent.emit('false');
  }

  gridRowSelectionChange(evt, ref){
    this.PlanDefinitionEvent.emit(evt.selectedRows[0].dataItem.Code);
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
