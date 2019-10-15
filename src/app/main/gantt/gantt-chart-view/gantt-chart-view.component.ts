import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import "../../../../assets/scripts/dhtmlx-gantt/codebase/dhtmlxgantt";
import { TaskService } from "../../../core/service/task.service";
import { LinkService } from "../../../core/service/link.service";
import { Task } from 'src/app/core/model/task';
import { Link } from 'src/app/core/model/link';
import { Scale } from 'src/app/core/model/scale';
import { environment } from '../../../../environments/environment';
import { GanttChartService } from '../service/gantt-chart.service';
import { DataService } from '../data.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: "gantt-chart-view",
    styleUrls: ['./gantt-chart-view.component.scss'],
    providers: [TaskService, LinkService],
    templateUrl: './gantt-chart-view.component.html',
})
export class GanttChartViewComponent implements OnInit, OnDestroy {
    @ViewChild("gantt_here", { static: true }) ganttContainer: ElementRef;    
    @ViewChild("ganttWrapper", { static: true }) ganttWrapper: ElementRef;    
    public scales: Scale[] = [
        { value: "hour", name: 'Hour' },
        { value: "day", name: 'Day' },
        { value: "week", name: 'Week' },
        { value: "month", name: 'Month' }
    ];
    public scaler:string = 'day';
    @Input() PlanDefinition;
    @Input() PlanOrderNo;
    public HeaderData: any;
    public CompanyDB: any;
    public loading: boolean;
    public products: any;
    public chartDataStatus: boolean;
    public mySubscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private dataService: DataService, private TaskService: TaskService, private linkService: LinkService, private _elementRef: ElementRef, private GanttChartService: GanttChartService) { 
       
    }

    

    ngOnInit() { 
        gantt = Gantt.getGanttInstance();
        this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
         this.mySubscription = this.dataService.getData().subscribe(definition=>{
            this.PlanDefinition = definition;
        });
        this.mySubscription = this.dataService.getOrder().subscribe(order=>{
          this.PlanOrderNo = order;
        });
        this.GanttChartService.GetHeaderData(environment.service_url,  this.CompanyDB, this.PlanDefinition, this.PlanOrderNo).subscribe(
            data => {
              this.HeaderData = data[0];
              console.log(this.HeaderData);
        });  

        this.products = [];
        this.loading = true;
        let _this = this;
        this.mySubscription = this.TaskService.getJSON(this.CompanyDB, this.PlanDefinition, this.PlanOrderNo).subscribe(res => {
            if(res){
                this.loading = true;
                this.products = res.map(function(obj) {
                obj['id'] = obj['SeqNo'];
                delete obj['SeqNo'];
    
                obj['text'] = obj['name'];
                delete obj['name'];
    
                obj['start_date'] = obj['STARTDATETIME']; 
                delete obj['STARTDATETIME'];
                     
                obj['end_date'] = obj['ENDDATETIME']; 
                delete obj['ENDDATETIME']; 
        
                obj['parent'] = obj['ParantId']; 
                delete obj['ParantId'];
    
                obj['open'] = true; 
    
                if(obj['parent'] == ""){
                    obj['type'] = "project"; 
                }else{
                    obj['type'] = "task";  
                }
                delete obj['OPTM_OPERNO'];
                delete obj['OPTM_OPR_ID'];
                delete obj['OPTM_RES_ID'];
                delete obj['U_O_RESNAME'];
                return obj; 
                }); 
            }
            let data = this.products;
                      
            if(data && data.length>0){
            gantt.config.scale_height = 25 * 3;
            gantt.config.link_line_width = 1;
            gantt.config.row_height = 25;
            gantt.config.task_height = 15;
            gantt.config.grid_resize = true;
            gantt.config.drag_links = true;
            gantt.config.drag_progress = true;
            gantt.config.date_grid = "%d-%M-%Y";
            gantt.config.fit_tasks = true;
         
            //gantt editable configuration
            gantt.config.readonly = true;
        
            gantt.config.columns = [
                {name: "text", label:"Opration", tree: true, width: '120', resize: true},
                {name: "description", text:"description", label:"Description",width: '100', resize: true},
                {name: "start_date", label:"Start Date", align: "center", width: '90', resize: true},
                {name: "end_date", label:"End Date", template:function(obj){
                    return obj.end_date}, align: "center", width: '90', resize: true},
                {name: "DURATION_IN_DAYS", label:"Duration (Days)", template:function(obj){
                        return Number.parseFloat(obj.DURATION_IN_DAYS).toFixed(3) + " Day(s)"},align: "center", width: '100', resize: true},
                {name: "DURATION_IN_HR", label:"Duration (Hour)", template:function(obj){                    
                    return _this.timeConvert(obj.DURATION_IN_HR)}, align: "center", width: '100', resize: true},
                {name: "OPTM_INFSQTY_PERC", label:"Infuse Quantity %", align: "center", width: '90', resize: true},
            ];
        
            gantt.config.layout = {
                css: "gantt_container",
                cols: [
                  {
                    width:400,
                    min_width: 300,
                    rows:[
                      {view: "grid", scrollX: "gridScroll", scrollable: true, scrollY: "scrollVer"}, 
                      {view: "scrollbar", id: "gridScroll", group:"horizontal"} 
                    ]
                  },
                  {resizer: true, width: 1},
                  {
                    rows:[
                      {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                      {view: "scrollbar", id: "scrollHor", group:"horizontal"}  
                    ]
                  },
                  {view: "scrollbar", id: "scrollVer"}
                ]
              };
            
            gantt.config.duration_unit = "minute";//an minute
            // gantt.config.duration_step = 30; // 0.5 hour
            gantt.config.xml_date = "%Y-%m-%d %H:%i";
            
        
            var zoomConfig = {
                levels: [
                    {
                        name:"hour",
                        scale_height: 48,
                        min_column_width:55,
                        scales:[
                            {unit: "day", step: 1, format: "%d %D %M, %Y"},
                            {unit: "hour", step: 1, format: "%g %a"},
                            
                        ]
                    },
                    {
                        name:"day",
                        scale_height: 48,
                        min_column_width:100,
                        scales:[
                            {unit: "day", step: 1, format: "%d %M"},
                            {unit: "month", format: "%F, %Y"},
                        ]
                    },
                    {
                        name:"week",
                        scale_height: 48,
                        min_column_width:100,
                        scales:[
                            {unit: "day", step: 1, format: "%d %D"},
                            {unit: "week", step: 1, format: function (date, time) {
                                var dateToStr = gantt.date.date_to_str("%d %M");
                                var endDate = gantt.date.add(date, 6, "day");
                                console.log(this);
                                var weekNum = gantt.date.date_to_str("%W")(date);
                                return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                            }},
                        ]
                    },
                    {
                        name:"month",
                        scale_height: 48,
                        min_column_width:120,
                        scales:[
                            {unit: "month", format: "%F, %Y"},
                            {unit: "week", format: "Week #%W"}
                        ]
                    }]};
        
            let  that = this;
            gantt.ext.zoom.init(zoomConfig);
            gantt.ext.tooltips.tooltip.hide();
            gantt.ext.zoom.setLevel("day");
            gantt.ext.zoom.attachEvent("onAfterZoom", function(level, config){
                that.scaler = config.name;  
            })
        
            //gantt popup
            gantt.config.lightbox.sections = [
                {name:"description",height:28, map_to:"text", type:"textarea", focus:true},
                {name: "type", type: "typeselect", map_to: "type"},
                {name:"time",type:"duration",map_to:"auto",time_format:["%d","%m","%Y","%H:%i"]}
            ];         
            gantt.templates.time_picker = function(date){
                return gantt.date.date_to_str(gantt.config.time_picker)(date);
            };
            gantt.templates.timeline_cell_class = function (task, date) {
                var d = new Date(date);
                var dayName = d.toString().split(' ')[0];
                if (dayName == "Sun" || dayName == "Sat")
                    return "week_end";
                return "";
            };
            gantt.templates.scale_cell_class = function (date) {
                var d = new Date(date);
                var dayName = d.toString().split(' ')[0];
                if (dayName == "Sun" || dayName == "Sat")
                    return "week_end";
                return "";
            };
            gantt.config.type_renderers[gantt.config.types.project]=function(task, defaultRender){
                var main_el = document.createElement("div");
                main_el.setAttribute(gantt.config.task_attribute, task.id);
                var size = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
                main_el.innerHTML = [
                    "<div class='project-left'></div>",
                    "<div class='project-name'>"+ task.description +"</div>",
                    "<div class='project-right'></div>"
                ].join('');
                main_el.className = "custom-project";
                main_el.style.left = size.left + "px";
                main_el.style.top = size.top + 7 + "px";
                main_el.style.width = size.width + "px";
             
                return main_el;
            };
            //tooltip
            gantt.templates.tooltip_text = function(start,end,task){
                function tConvert(time) {
                    // Check correct time format and split into components
                    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];            
                    if (time.length > 1) { // If time format correct
                        time = time.slice(1); // Remove full string match value
                        time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
                        time[0] = +time[0] % 12 || 12; // Adjust hours
                    }
                    return time.join(''); // return adjusted time or original string
                }
                let StartEl = new Date(start),
                    EndEl = new Date(end),
                    Start = tConvert(StartEl.toTimeString().substr(0,5)) +" "+ StartEl.getDate() +"-" + StartEl.getMonth() + "-" + StartEl.getFullYear(),
                    End = tConvert(EndEl.toTimeString().substr(0,5)) +" "+ EndEl.getDate() +"-" + EndEl.getMonth() + "-" + EndEl.getFullYear();
                    
                return "<div class='header'><span>"+task.text+"</span></div><div><b>Description:</b><span> " + task.description+"</span></div><div><b>Start:</b><span> " + Start+"</span></div><div><b>End:</b><span> " + End+"</span></div><div><b>Duration (Day):</b><span> " + 
                 Number.parseFloat(task.DURATION_IN_DAYS).toFixed(3) + " Day(s)"+"</span></div>"+"</span></div><div><b>Duration (Hour):</b><span> " + 
                    _this.timeConvert(task.DURATION_IN_HR) +"</span></div>";
            };  
                this.chartDataStatus = true;
                setTimeout(()=>{
                    this.loading = false;
                    gantt.init(this.ganttContainer.nativeElement);
                    gantt.clearAll();
                    gantt.parse({data});
                }, 1000);
            }else{
            this.chartDataStatus = false;
            this.loading = false;
            this.notificationService.show({
              content: 'No Record Found',
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'right', vertical: 'top' },
              type: { style: 'error', icon: true },
              hideAfter: 1000
            }); 
          }
         });
         this.ganttWrapper.nativeElement.onmouseout = function(){
            setTimeout(()=>{
                gantt.ext.tooltips.tooltip.hide();
            },100);
         }
    }


    public onScaleChange(el) {
        gantt.ext.zoom.setLevel(el.target.value)
    }
    public zoomIn(){
        gantt.ext.zoom.zoomIn();
    }
    public zoomOut(){
        gantt.ext.zoom.zoomOut()
    }
    public toggleCritical = function () {
		if (gantt.config.highlight_critical_path)
			gantt.config.highlight_critical_path = !true;
		else
			gantt.config.highlight_critical_path = true;
		gantt.render();
    }
    
    public timeConvert(num) { 
        var _num = num * 60;
        var hours = Math.floor(_num / 60);  
        var minutes = Math.floor(_num % 60);
        return (hours !=0 ? (hours + ' Hr') :'') +' '+(minutes !=0 ? (minutes + ' Min') :'');         
    }

    ngOnDestroy() {
        this.mySubscription.unsubscribe();
    }
}
