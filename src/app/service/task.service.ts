import {Injectable} from "@angular/core";
import {Task} from "../model/task";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
  
export class TaskService {

	public products: any;
	public arrays: any;

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
            this.products = res.map(function(obj) { 
                obj['id'] = obj['SeqNo'];
                delete obj['SeqNo'];

                obj['text'] = obj['name'];
                delete obj['name'];

                obj['start_date'] = obj['STARTDATETIME']; 
                delete obj['STARTDATETIME'];
                 
                obj['end_date'] = obj['ENDDATETIME']; 
                delete obj['ENDDATETIME']; 

                // obj['progress'] = 1; 

                obj['parent'] = obj['ParantId']; 
                delete obj['ParantId'];

                obj['open'] = true; 

                if(obj['parent'] == ""){
                    // obj['type'] = "operation"; 
                    obj['type'] = "project"; 
                    
                }else{
                    // obj['type'] = "resource";  
                    obj['type'] = "task";  
                }

                delete obj['OPTM_OPERNO'];
                delete obj['OPTM_OPR_ID'];
                delete obj['OPTM_RES_ID']
                delete obj['U_O_RESNAME']
                
                return obj; 
            }); 
            localStorage.setItem('ganttChart', JSON.stringify(this.products));
        });

        this.arrays = JSON.parse(localStorage.getItem('ganttChart'));
        this.products = this.arrays; 
        console.log(JSON.stringify(this.products));

		return Promise.resolve(
			this.products
		);
	}
}	
	
	
