import {Injectable, Output, EventEmitter} from "@angular/core";
import {Task} from "../model/task";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
  
export class TaskService {

	public products: any;
    public arrays: any;
    public db: any;
    public description: any;
    public order: any;
    private subject = new Subject<any>();

    constructor(private httpClient : HttpClient, private Router : Router) { }
    
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Accept':'application/json'
		  })
    };
    
    toggle(db, process, order) {
      this.db = db;
      this.description = process;
      this.order = order;
      this.get(this.db, this.description, this.order);
    }

	get(db, desc, order): Promise<any>{
		let jObject:any={ ItemList: JSON.stringify([{ 
            CompanyDBID: db,
			PlannedDefination: desc,
            PlannedOrderNo: order
        }])};
    
        if(db && desc && order){
            this.httpClient.post("http://172.16.6.117/OptiProRCCPGanttChart/RCCPGanttChart/GetGanttChartData",jObject,this.httpOptions).subscribe((res : any[])=>{
                if(res){
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
                }
                console.log(this.products);
                localStorage.setItem('ganttChart', JSON.stringify(this.products));
            });  
        }

        return new Promise(resolve => {
            setTimeout(() => {
                this.arrays = JSON.parse(localStorage.getItem('ganttChart'));
                this.products = this.arrays; 
                resolve(this.products);
            }, 6000);
        });

       /* this.arrays = JSON.parse(localStorage.getItem('ganttChart'));
        this.products = this.arrays; 
        console.log(this.products);
		return Promise.resolve(
			this.products
        );*/
    }

    
}	
	
	
