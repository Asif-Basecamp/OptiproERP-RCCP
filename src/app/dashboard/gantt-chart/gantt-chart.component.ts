import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Injector } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/localstorage.service';
import { ServiceLocator } from 'src/app/core/servicelocator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {

  constructor(private translate: TranslateService, private datePipe: DatePipe, private localStorageService: LocalStorageService, private injector: Injector) {
    let userLang: string = this.localStorageService.getCurrentLanguage();
    translate.use(userLang);
    ServiceLocator.injector = this.injector;
  }

  ngOnInit() {
  }

  openPlanDefinition(){
    alert('hello');
  }

  openPlanOrderNumber(){
    alert('hello');
  }

}
