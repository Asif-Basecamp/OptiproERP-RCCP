import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import "./../../../../assets/scripts/dhtmlx-gantt";
import { TaskService } from "../../../service/task.service";
import { LinkService } from "../../../service/link.service";
import { Task } from 'src/app/model/task';
import { Link } from 'src/app/model/link';
import { Scale } from 'src/app/model/scale';
import { environment } from '../../../../environments/environment';
import { GanttChartService } from '../service/gantt-chart.service';

@Component({
    selector: "<gantt></gantt>",
    styleUrls: ['./gantt-chart-view.component.scss'],
    providers: [TaskService, LinkService],
    templateUrl: './gantt-chart-view.component.html',
})
export class GanttChartViewComponent implements OnInit {
    @ViewChild("gantt_here", { static: true }) ganttContainer: ElementRef;    
    public scales: Scale[] = [
        { value: "hour", name: 'Hour' },
        { value: "day", name: 'Day' },
        { value: "week", name: 'Week' },
        { value: "month", name: 'Month' }
    ];
    public scaler:string = 'day';

    constructor(private taskService: TaskService, private linkService: LinkService, private _elementRef: ElementRef, private GanttChartService: GanttChartService) { }

    ngOnInit() {
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
            {name: "duration", label:"Duration (H)", template:function(obj){
                console.log(obj.duration);
                return obj.duration/60},align: "center", width: '100', resize: true},
            // {name: "progress", label:"Progress",template:function(obj){
            //     return Math.round(obj.progress*100) + "%"}, align: "center", width: '80', resize: true},
            // {name: "add", width: 40}
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
        // gantt.config.work_time = true;
        // gantt.config.xml_date = "%h:%i %d-%m-%Y";
        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        

        var zoomConfig = {
            levels: [
                {
                    name:"hour",
                    scale_height: 48,
                    min_column_width:55,
                    scales:[
                        {unit: "day", step: 1, format: "%d %M"},
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
                        {unit: "week", step: 1, format: function (date) {
                            var dateToStr = gantt.date.date_to_str("%d %M");
                            var endDate = gantt.date.add(date, 6, "day");
                            var weekNum = gantt.date.date_to_str("%W")(date);
                            return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                        }},
                        {unit: "day", step: 1, format: "%d %D"}
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
                Start = tConvert(StartEl.toTimeString().substr(0,5)) +" "+ StartEl.getUTCDate() +"-" + StartEl.getUTCMonth() + "-" + StartEl.getUTCFullYear(),
                End = tConvert(EndEl.toTimeString().substr(0,5)) +" "+ EndEl.getUTCDate() +"-" + EndEl.getUTCMonth() + "-" + EndEl.getUTCFullYear();

            return "<div class='header'><span>"+task.text+"</span></div><div><b>Description:</b><span> " + task.description+"</span></div><div><b>Start:</b><span> " + Start+"</span></div><div><b>End:</b><span> " + End+"</span></div><div><b>Duration:</b><span> " + task.duration/60 + " Hour(s)"+"</span></div><div><b>Progress:</b><span> ";
             //+ Math.round(task.progress*100) + "%</span></div>";
        };
        gantt.init(this.ganttContainer.nativeElement);
        Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({ data, links });
            });
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
}
