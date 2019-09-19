import {Injectable} from "@angular/core";
import {Task} from "../model/task";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
  
export class TaskService {

	public products: any;

	constructor(private httpClient : HttpClient) { }

	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Accept':'application/json'
		  })
	};

	get(): Promise<Task[]>{
		let jObject:any={ ItemList: JSON.stringify([{ 
			CompanyDBID: 'PLANNING_ENGINE03',
			PlannedDefination: 'FG0009-01',
			PlannedOrderNo: '415654'
		}])};
		this.httpClient.post("http://172.16.6.117/OptiProRCCPGanttChart/RCCPGanttChart/GetGanttChartData",jObject,this.httpOptions).subscribe((res : any[])=>{
			this.products = res;
			/*for(let i=0; i<this.products.length; i++){
				//var hours = Math.abs(this.products[i].STARTDATE - this.products[i].ENDDATE) / 36e5;
				//this.products[i]["start_date"] = hours;
				this.products[i]["duration"] = this.products[i].DURATION;
			}
			console.log(this.products);*/
		});

		return Promise.resolve(
			// [{id: 1, text: "Project #1", start_date: "09:18 15-09-2019", description:"demo", duration:6, progress: 0.45, parent: "", open:true, type:'project'},
			[{id: 1, text: "Project #1", start_date: "2019-10-09 08:00", description:"demo", end_date:"2019-10-11 15:30", progress: 0.45, parent: "", open:true, type:'task'},
			// {id: 2, text: "Task #1-1", start_date: "09:18 15-09-2019", description:"demo", duration:3, progress: 0.45, parent: "1", open:true, type:'task' },
			// {id: 3, text: "Task #1-2", start_date: "10:54 16-09-2019", description:"demo", duration:3, progress: 0.45, parent: "1", open:true, type:'task'},
			// {id: 4, text:"Project #2", start_date:"15:29 17-09-2019", description:"demo", duration:16, progress:0.6, parent: "", open: true, type:'project'},
			{id: 4, text:"Project #2", start_date:"2019-10-23 18:00", description:"demo", end_date:"2019-10-24 15:00", progress:0.6, parent: "", open: true, type:'task'}]
        	// {id: 5, text:"Task #2-1", start_date:"15:29 17-09-2019", description:"demo", duration:8, progress:0.6, parent:"4", open: true, type:'task' },
			// {id: 6, text:"Task #2-2", start_date:"11:17 18-09-2019", description:"demo", duration:8, progress:0.6, parent:"4", open: true, type:'task'}]
		);
	}
}	
	
	
