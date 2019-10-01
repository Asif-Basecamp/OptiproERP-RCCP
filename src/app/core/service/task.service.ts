import {Injectable, Output, EventEmitter} from "@angular/core";
import {Task} from "../model/task";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { promise } from 'protractor';

@Injectable({
	providedIn: 'root'
})
  
export class TaskService {

	public products: any;
    public db: any;
    public description: any;
    public order: any;
    private subject = new Subject<any>();
    public data: any;

    constructor(private httpClient : HttpClient, private Router : Router) { }
    
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Accept':'application/json'
		  })
    };

    public getJSON(db, desc, order): Observable<any> { 
        let jObject:any={ ItemList: JSON.stringify([{ 
            CompanyDBID: db,
			PlannedDefination: desc,
            PlannedOrderNo: order
        }])};  
    return this.httpClient.post("http://172.16.6.117/OptiProRCCPGanttChart/RCCPGanttChart/GetGanttChartData",jObject,this.httpOptions);
    } 
}	
	
	
