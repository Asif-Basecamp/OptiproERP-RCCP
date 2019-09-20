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
			 [{id: 1, text: "Operation #1", start_date: "2019-09-15 09:18 ", description:"demo", end_date:"2019-09-18 15:30", progress: 0.45, parent: "", open:true, type:'operation'},
             {id: 2, text: "Resource #1-1", start_date: "2019-09-15 09:18", description:"demo", end_date:"2019-09-18 15:30", progress: 0.45, parent: "1", open:true, type:'resource' },
             {id: 3, text: "Resource #1-2", start_date: "2019-09-16 10:54", description:"demo", end_date:"2019-09-18 15:30", progress: 0.45, parent: "1", open:true, type:'resource'},
             {id: 4, text:"Operation #2", start_date:"2019-09-17 15:29", description:"demo", end_date:"2019-09-19 15:30", progress:0.6, parent: "", open: true, type:'operation'},
             {id: 5, text:"Resource #2-1", start_date:"2019-09-17 15:29 ", description:"demo", end_date:"2019-09-18 15:30", progress:0.6, parent:"4", open: true, type:'resource' },
             {id: 6, text:"Resource #2-2", start_date:"2019-09-18 11:17", description:"demo", end_date:"2019-09-21 15:30", progress:0.6, parent:"4", open: true, type:'resource'}]
		);
	}
}	
	
	
